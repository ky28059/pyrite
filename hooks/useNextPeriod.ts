import {useContext} from 'react';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import {Section} from '@/util/unitime';


/**
 * Get the next period (and info about relative times for it) from a list of classes.
 * Original logic borrowed from {@link https://github.com/GunnWATT/watt/blob/main/shared/util/schedule.ts WATT}.
 *
 * @param classes The (sorted) list of classes on that given day.
 * @returns The next period, the minutes to its start and end, and its length and length of break preceding it.
 */
export function useNextPeriod(classes: Section[]) {
    const time = useContext(CurrentTimeContext);

    const localized = time.setZone('America/Indiana/Indianapolis');
    const midnight = localized.startOf('day');
    const minutes = localized.diff(midnight, 'minutes').minutes;

    if (!classes.length)
        return {next: null, span: 0, length: 0, toStart: 0, toEnd: 0};

    // Loop through all periods, finding the index of the first period for which the current time is less
    // than the end time.
    let currPd;
    for (currPd = 0; currPd < classes.length; currPd++) {
        if (minutes < parseUnitimeMinutes(classes[currPd].end)) break;
    }

    // If no period exists that has an end time after the current time, no next period exists.
    if (currPd >= classes.length)
        return {next: null, span: 0, length: 0, toStart: 0, toEnd: 0};

    const next = classes[currPd];
    const prev = classes[currPd - 1];

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
