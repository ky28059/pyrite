import { readFile, writeFile } from 'node:fs/promises';
import { cache } from 'react';


// https://docs.google.com/document/d/1YIvPtHRbqF7pJXqlrqll41ncAjM8GlCQMHowi52K-Bw/edit
// https://timetable.mypurdue.purdue.edu/Timetabling/export?output=events.csv&type=room&term=${TERM}&flags=${FLAGS}
// https://timetable.mypurdue.purdue.edu/Timetabling/export?output=events.csv&type=room&term=Spring2024PWL&flags=26499

const TERM = 'Spring2024PWL';
const FLAGS = 0b110011110000011;

export type Section = {
    names: string[], // ex. AAE 20300
    sections: string[], // ex. 10001-001
    type: SectionType,
    titles: string[], // ex. Aeromechanics I
    dayOfWeek: string, // ex. TTh
    start: string,
    end: string,
    location: string,
    instructors: string[],
    emails: string[],
    midterms: Test[][],
    finals: Test[],
}
export type SectionType = 'Lecture' | 'Lecture (Hybrid)' | 'Lecture (Synchronous Online)'
    | 'Laboratory' | 'Laboratory (Hybrid)'
    | 'Recitation' | 'Recitation (Hybrid)'
    | 'Pso'
    | 'Travel Time'

export type Test = {
    dayOfWeek: string,
    location: string,
    start: string,
    end: string,
    date: string
}

export const loadClasses = cache(async () => {
    const res: { [id: string]: Section } = {};

    // Fields in this CSV can contain both newlines and commas. To properly parse,
    // 1. each row ends in `,\n` (so split the text file by that)
    // 2. values in each column are wrapped by double quotes; therefore, assume a comma indicates a new column only if
    //    it is succeeded by a double quote or another comma.
    const rows = (await readFile(process.cwd() + '/util/unitime/classes.csv')).toString().split(',\n');

    // Drop first row (header) and last row (empty string)
    for (const r of rows.slice(1, rows.length - 1)) {
        const [nameRaw, sectionRaw, type, titleRaw, dayOfWeek, first, last, start, end, pstart, pend, location, instrRaw, emailRaw] = r.slice(1, r.length).split(/"?,(?=[",]|$)"?/);

        const names = nameRaw.split('\n').map(s => s.trim()).filter((s) => !!s);
        const sections = sectionRaw.split('\n').map(s => s.trim()).filter((s) => !!s);

        // Parse midterm exams
        if (type === 'Midterm Examination') {
            const midterm: Test = {
                dayOfWeek,
                start,
                end,
                location,
                date: first
            };

            // If the section name is "Offering", add midterm to all lecture periods instead.
            if (sections[0] === 'Offering') {
                const objs = Object.values(res).filter(s => s.type.includes('Lecture') && names.some(n => s.names.includes(n)));
                if (!objs.length) {
                    console.log(`[ERR] Midterm for ${names[0]} parsed before corresponding class!`);
                    continue;
                }

                objs.forEach(s => {
                    const group = s.midterms.find(g => g[0].date === first);
                    if (group) {
                        group.push(midterm)
                    } else {
                        s.midterms.push([midterm]);
                        s.midterms.sort((g1, g2) => g1[0].date.localeCompare(g2[0].date))
                    }
                });
            } else {
                if (!res[sections[0]]) {
                    console.log(`[ERR] Midterm for ${names[0]} parsed before corresponding class!`);
                    continue;
                }

                const group = res[sections[0]].midterms.find(g => g[0].date === first);
                if (group) {
                    group.push(midterm)
                } else {
                    res[sections[0]].midterms.push([midterm]);
                    res[sections[0]].midterms.sort((g1, g2) => g1[0].date.localeCompare(g2[0].date))
                }
            }
            continue;
        }

        // Parse final exams
        if (type === 'Final Examination') {
            const final: Test = {
                dayOfWeek,
                start,
                end,
                location,
                date: first
            };

            // If the section name is "Offering" or "Course", add final to all lecture periods instead.
            // TODO: real meaning of this?
            if (sections[0] === 'Offering' || sections[0] === 'Course') {
                const objs = Object.values(res).filter(s => s.type.includes('Lecture') && names.some(n => s.names.includes(n)));
                if (!objs.length) {
                    console.log(`[ERR] Final for ${names[0]} parsed before corresponding class!`);
                    continue;
                }

                objs.forEach(s => s.finals.push(final));
            } else {
                if (!res[sections[0]]) {
                    console.log(`[ERR] Final for ${names[0]} parsed before corresponding class!`);
                    continue;
                }

                res[sections[0]].finals.push(final);
            }
            continue;
        }

        res[sections[0]] = {
            names,
            sections,
            type: type as Section['type'],
            titles: titleRaw.split('\n').filter((s) => !!s),
            dayOfWeek,
            start,
            end,
            location,
            instructors: instrRaw.split('\n').filter((s) => !!s),
            emails: emailRaw.slice(0, emailRaw.length - 1).split('\n').filter((s) => !!s),
            midterms: [],
            finals: []
        }
    }

    await writeFile(process.cwd() + '/util/unitime/classes.json', JSON.stringify(res));

    return res;
})
