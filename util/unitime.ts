import {readFileSync, writeFileSync} from 'fs';


const TERM = 'Spring2024PWL';

type Contact = {
    firstName: string,
    middleName?: string,
    lastName: string,
    formattedName: string,
    email?: string
}

type Instructor = Contact & {
    responsibility: string,
    responsibilityAbbreviation: string
}

export type Section = {
    canEdit: boolean,
    canView: boolean,
    reqAttendance: boolean,

    classId: number,
    contact: Contact,

    courseIds: number[],
    courseNames: string[],
    courseTitles: string[],
    externalIds: string[],

    eventId: number,
    eventName: string,
    eventType: 'Class',

    instruction: 'Lecture' | '',
    instructionType: number,
    instructors?: Instructor[],
    meetings: any[], // TODO

    enrollment: number,
    maxCapacity: number,

    sectionNumber: string,
    sequence: number,
    sessionId: number,
    timestamp: string // ISO
}

export async function loadClasses() {
    const classes: Section[] = JSON.parse(readFileSync('./util/classes.json').toString());
    console.log(classes.length)

    const filtered = classes.filter(c => c.eventType === 'Class');
    console.log(filtered.length)

    return filtered;
}
