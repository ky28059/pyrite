import {readFileSync, writeFileSync} from 'fs';
import {cache} from 'react';


const TERM = 'Spring2024PWL';

export type Section = {
    names: string[], // ex. AAE 20300
    sections: string[], // ex. 10001-001
    type: 'Lecture' | 'Laboratory' | 'Laboratory (Hybrid)' | 'Recitation' | 'Pso' | 'Travel Time',
    titles: string[], // ex. Aeromechanics I
    dayOfWeek: string, // ex. TTh
    start: string,
    end: string,
    location: string,
    instructors: string[],
    emails: string[],
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
        const sections = sectionRaw.split('\n').map(s => s.trim());

        res[sections[0]] = {
            names: nameRaw.split('\n').map(s => s.trim()),
            sections,
            type: type as Section['type'],
            titles: titleRaw.split('\n'),
            dayOfWeek,
            start,
            end,
            location,
            instructors: instrRaw.split('\n'),
            emails: emailRaw.split('\n')
        }
    }

    return res;
})
