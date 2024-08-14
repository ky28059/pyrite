import { useContext } from 'react';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';
import EventsContext from '@/contexts/EventsContext';

// Utils
import { getPeriodsForDay, ZONE } from '@/util/schedule';


/**
 * Get the next period (and info about relative times for it) for the current user.
 * Original logic borrowed from {@link https://github.com/GunnWATT/watt/blob/main/shared/util/schedule.ts WATT}.
 *
 * @returns The next period, the minutes to its start and end, and its length and length of break preceding it.
 */
export function useNextPeriod() {
    const classes = useContext(ClassesContext);
    const { data } = useContext(UserDataContext);

    const time = useContext(CurrentTimeContext);
    const { events } = useContext(EventsContext);

    // The user's classes for the current date, sorted ascending by start time.
    const sorted = getPeriodsForDay(time, data, classes, events)

    const localized = time.setZone(ZONE);
    const midnight = localized.startOf('day');
    const minutes = localized.diff(midnight, 'minutes').minutes;

    if (!sorted.length)
        return { next: null, span: 0, length: 0, toStart: 0, toEnd: 0 };

    // Loop through all periods, finding the index of the first period for which the current time is less
    // than the end time.
    let currPd;
    for (currPd = 0; currPd < sorted.length; currPd++) {
        if (minutes < sorted[currPd].e) break;
    }

    // If no period exists that has an end time after the current time, no next period exists.
    if (currPd >= sorted.length)
        return { next: null, span: 0, length: 0, toStart: 0, toEnd: 0 };

    const next = sorted[currPd];
    const prev = sorted[currPd - 1];

    // Span = minutes between previous and next period
    const span = prev
        ? next.s - prev.e
        : 30;

    // Length = length (in minutes) of next period
    const length = next.e - next.s;

    // Minutes to start and end of next period
    const toStart = next.s - minutes;
    const toEnd = next.e - minutes;

    return { next, span, length, toStart, toEnd }
}
