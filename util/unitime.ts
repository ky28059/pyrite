import {readFileSync, writeFileSync} from 'fs';
import {cache} from 'react';


const TERM = 'Spring2024PWL';

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
    midterms: Midterm[],
}
export type SectionType = 'Lecture' | 'Lecture (Hybrid)'
    | 'Laboratory' | 'Laboratory (Hybrid)'
    | 'Recitation' | 'Recitation (Hybrid)'
    | 'Pso'
    | 'Travel Time'

export type Midterm = {
    dayOfWeek: string,
    location: string,
    start: string,
    end: string,
    date: string
}

export const loadClasses = cache(async () => {
    const res: {[id: string]: Section} = {};

    // Fields in this CSV can contain both newlines and commas. To properly parse,
    // 1. each row ends in `,\n` (so split the text file by that)
    // 2. values in each column are wrapped by double quotes; therefore, assume a comma indicates a new column only if
    //    it is succeeded by a double quote or another comma.
    const rows = readFileSync('./util/classes.csv').toString().split(',\n')

    // Drop first row (header) and last row (empty string)
    for (const r of rows.slice(1, rows.length - 1)) {
        const [nameRaw, sectionRaw, type, titleRaw, note, dayOfWeek, first, last, start, end, pstart, pend, , , location, capacity, enrollment, limit, instrRaw, emailRaw, , ] = r.slice(1, r.length - 1).split(/"?,(?=[",])"?/);

        const names = nameRaw.split('\n').map(s => s.trim()).filter((s) => !!s);
        const sections = sectionRaw.split('\n').map(s => s.trim()).filter((s) => !!s);

        // Parse midterm exams
        if (type === 'Midterm Examination') {
            // If the section name is "Offering", add midterm to all lecture periods instead.
            if (sections[0] === 'Offering') {
                const objs = Object.values(res).filter(s => s.type.includes('Lecture') && names.some(n => s.names.includes(n)));
                if (!objs.length) {
                    console.log(`[ERR] Midterm for ${names[0]} parsed before corresponding class!`);
                    continue;
                }

                objs.forEach(s => s.midterms.push({
                    dayOfWeek,
                    start,
                    end,
                    location,
                    date: first
                }));
            } else {
                if (!res[sections[0]]) {
                    console.log(`[ERR] Midterm for ${names[0]} parsed before corresponding class!`);
                    continue;
                }

                res[sections[0]].midterms.push({
                    dayOfWeek,
                    start,
                    end,
                    location,
                    date: first
                });
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
            emails: emailRaw.split('\n').filter((s) => !!s),
            midterms: []
        }
    }

    return res;
})
