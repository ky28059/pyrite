import {useContext} from 'react';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';

// Utils
import {ZONE} from '@/util/schedule';


/**
 * Get the next period (and info about relative times for it) for the current user.
 * Original logic borrowed from {@link https://github.com/GunnWATT/watt/blob/main/shared/util/schedule.ts WATT}.
 *
 * @returns The next period, the minutes to its start and end, and its length and length of break preceding it.
 */
export function useNextPeriod() {
    const classes = useContext(ClassesContext);
    const {data} = useContext(UserDataContext);
    const time = useContext(CurrentTimeContext);

    // The user's classes for the current date, sorted ascending by start time.
    const sorted = data.courseIds.map((id) => classes[id]).filter((c) => {
        switch (time.weekday) {
            case 1: return c.dayOfWeek.includes('M');
            case 2: return /T(?!h)/.test(c.dayOfWeek);
            case 3: return c.dayOfWeek.includes('W');
            case 4: return c.dayOfWeek.includes('Th');
            case 5: return c.dayOfWeek.includes('F');
        }
        return false;
    }).sort((a, b) => parseUnitimeMinutes(a.start) - parseUnitimeMinutes(b.start));

    const localized = time.setZone(ZONE);
    const midnight = localized.startOf('day');
    const minutes = localized.diff(midnight, 'minutes').minutes;

    if (!sorted.length)
        return {next: null, span: 0, length: 0, toStart: 0, toEnd: 0};

    // Loop through all periods, finding the index of the first period for which the current time is less
    // than the end time.
    let currPd;
    for (currPd = 0; currPd < sorted.length; currPd++) {
        if (minutes < parseUnitimeMinutes(sorted[currPd].end)) break;
    }

    // If no period exists that has an end time after the current time, no next period exists.
    if (currPd >= sorted.length)
        return {next: null, span: 0, length: 0, toStart: 0, toEnd: 0};

    const next = sorted[currPd];
    const prev = sorted[currPd - 1];

    // Span = minutes between previous and next period
    const span = prev
        ? parseUnitimeMinutes(next.start) - parseUnitimeMinutes(prev.end)
        : 30;

    // Length = length (in minutes) of next period
    const length = parseUnitimeMinutes(next.end) - parseUnitimeMinutes(next.start);

    // Minutes to start and end of next period
    const toStart = parseUnitimeMinutes(next.start) - minutes;
    const toEnd = parseUnitimeMinutes(next.end) - minutes;

    return {next, span, length, toStart, toEnd}
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
