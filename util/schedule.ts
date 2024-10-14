import { DateTime, Interval } from 'luxon';
import type { UserData } from '@/contexts/UserDataContext';
import type { Events } from '@/contexts/EventsContext';
import type { Test, Section, SectionType } from '@/util/unitime';
import type { BoilerLinkEventData } from '@/util/boilerlink';


export const ZONE = 'America/Indianapolis'; // TODO: browser standards?

// TODO: generate these?
export const YEAR_START = DateTime.fromISO('2024-08-19', { zone: ZONE });
export const YEAR_END = DateTime.fromISO('2025-05-10', { zone: ZONE });

export const FALL_FINALS = Interval.fromISO('2024-12-09/2024-12-14', { zone: ZONE })
export const SPRING_FINALS = Interval.fromISO('2025-05-05/2025-05-10', { zone: ZONE })

export const FALL_BREAK = Interval.fromISO('2024-10-07/2024-10-09', { zone: ZONE })
export const THANKSGIVING_BREAK = Interval.fromISO('2024-11-27/2024-11-30', { zone: ZONE });
export const WINTER_BREAK = Interval.fromISO('2024-12-14/2025-01-13', { zone: ZONE });
export const SPRING_BREAK = Interval.fromISO('2025-03-17/2025-03-22', { zone: ZONE });

export const HOUR_START = 7;
export const HOUR_END = 22;


type PeriodBase = {
    name: string,
    location: string,
    s: number, // Minutes after midnight EST
    e: number
}
export type SectionPeriod = PeriodBase & {
    type: SectionType,
    section: Section // TODO: naming, more efficient abstraction?
}
export type TestPeriod = PeriodBase & {
    type: 'Midterm' | 'Final',
    section: Section,
    test: Test
}
export type EventPeriod = PeriodBase & {
    type: 'Event',
    event: BoilerLinkEventData
}

export type Period = SectionPeriod | TestPeriod | EventPeriod;

/**
 * Get the schedule periods happening on a given day, sorted by start time. Returned periods include classes,
 * events, and generally anything on the schedule for a given day.
 *
 * @param date The date to get the blocks for.
 * @param data The user's `UserData` object.
 * @param classes The classes map.
 * @param events The events map.
 * @returns The array of "blocks" occurring on a given day.
 */
export function getPeriodsForDay(
    date: DateTime,
    data: UserData,
    classes: { [p: string]: Section },
    events: Events
) {
    // Classes, midterms, and finals for the given day
    const classPeriods = data.courseIds.map((id) => classes[id]).flatMap((c) => {
        const res = [];

        const midterm = c.midterms.flatMap(m => m).find((m) => m.date === date.toFormat('MM/dd/yyyy'));
        if (midterm) res.push({
            type: 'Midterm',
            name: c.names[0] + ' (Midterm)',
            location: midterm.location,
            s: parseUnitimeMinutes(midterm.start),
            e: parseUnitimeMinutes(midterm.end),
            test: midterm,
            section: c
        } satisfies TestPeriod);

        const final = c.finals.find((m) => m.date === date.toFormat('MM/dd/yyyy'));
        if (final) res.push({
            type: 'Final',
            name: c.names[0] + ' (Final)',
            location: final.location,
            s: parseUnitimeMinutes(final.start),
            e: parseUnitimeMinutes(final.end),
            test: final,
            section: c
        } satisfies TestPeriod);

        // Filter out classes that don't regularly occur on this day of week
        // (or filter out all regular classes if it's a break or finals week).
        if (
            !occursOnDay(c, date)
            || FALL_FINALS.contains(date)
            || SPRING_FINALS.contains(date)
            || FALL_BREAK.contains(date)
            || THANKSGIVING_BREAK.contains(date)
            || WINTER_BREAK.contains(date)
            || SPRING_BREAK.contains(date)
            || date < YEAR_START
            || date > YEAR_END
        ) return res;

        res.push({
            type: c.type,
            name: c.names[0], // TODO?
            location: c.location,
            s: parseUnitimeMinutes(c.start),
            e: parseUnitimeMinutes(c.end),
            section: c
        } satisfies SectionPeriod);

        return res;
    });

    // Events for the given day
    const blEventPeriods = events[date.toISODate()!]?.filter((e) => data.eventIds.includes(e.id)).map<EventPeriod>((e) => {
        const start = DateTime.fromISO(e.startsOn);
        const end = DateTime.fromISO(e.endsOn);

        // const isSameDay = start.hasSame(end, 'day');
        // if (!isSameDay) return null; // TODO

        const midnight = start.startOf('day');

        return {
            type: 'Event',
            name: e.name,
            location: e.location,
            s: start.diff(midnight, 'minutes').minutes,
            e: end.diff(midnight, 'minutes').minutes,
            event: e
        }
    });

    const periods: Period[] = blEventPeriods
        ? [...classPeriods, ...blEventPeriods]
        : classPeriods

    return periods.sort((a, b) => a.s - b.s);
}

/**
 * Parses a UniTime time string into its corresponding number of minutes from 12:00 AM.
 * @param time The string to parse.
 * @returns The number of minutes from midnight this string represents.
 */
export function parseUnitimeMinutes(time: string) {
    if (time === 'noon') return 720;

    // Parse AM/PM time string, subtracting 84 because the grid starts at 7:00 AM and adding one for indexing.
    let [hour, minute] = time.slice(0, time.length - 1).split(':').map(s => Number(s));
    if (time.endsWith('p') && hour != 12) hour += 12;

    return hour * 60 + minute;
}

function occursOnDay(c: Section, date: DateTime) {
    switch (date.weekday) {
        case 1: return c.dayOfWeek.includes('M');
        case 2: return /T(?!h)/.test(c.dayOfWeek);
        case 3: return c.dayOfWeek.includes('W');
        case 4: return c.dayOfWeek.includes('Th');
        case 5: return c.dayOfWeek.includes('F');
    }
    return false;
}
