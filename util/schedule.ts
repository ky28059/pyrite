import {DateTime} from 'luxon';


export const ZONE = 'America/Indiana/Indianapolis';
export const YEAR_START = DateTime.fromISO('2023-08-21', {zone: ZONE});
export const YEAR_END = DateTime.fromISO('2024-05-04', {zone: ZONE})
