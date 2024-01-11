import {useContext} from 'react';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import {Section} from '@/util/unitime';


// See https://github.com/GunnWATT/watt/blob/main/shared/util/schedule.ts
export function useNextPeriod(classes: Section[]) {
    const time = useContext(CurrentTimeContext);

    const localized = time.setZone('America/Indiana/Indianapolis');
    const midnight = localized.startOf('day');
    const minutes = localized.diff(midnight, 'minutes').minutes;

    let prev = null, next = null, span = 0, length = 0, toStart = 0, toEnd = 0;
    if (!classes.length) return {prev, next, span, length, toStart, toEnd};

    // Loop through all periods, finding the index of the first period for which the current time is less
    // than the end time.
    let currPd;
    for (currPd = 0; currPd < classes.length; currPd++) {
        if (minutes < parseTimeMinutes(classes[currPd].end)) break;
    }

    // If no period exists that has an end time after the current time, no next period exists.
    if (currPd >= classes.length) {
        prev = classes[classes.length - 1];

        toEnd = minutes - parseTimeMinutes(prev.end);
    } else if (currPd > 0) {
        prev = classes[currPd - 1];
        next = classes[currPd];

        span = parseTimeMinutes(next.start) - parseTimeMinutes(prev.end);
        toStart = parseTimeMinutes(next.start) - minutes;
        toEnd = parseTimeMinutes(next.end) - minutes;
        length = parseTimeMinutes(next.end) - parseTimeMinutes(next.start);
    } else {
        next = classes[currPd];

        span = 30;
        toStart = parseTimeMinutes(next.start) - minutes;
        toEnd = parseTimeMinutes(next.end) - minutes;
        length = parseTimeMinutes(next.end) - parseTimeMinutes(next.start);
    }

    return {prev, next, span, length, toStart, toEnd}
}

function parseTimeMinutes(time: string) {
    if (time === 'noon') return 720;

    // Parse AM/PM time string, subtracting 84 because the grid starts at 7:00 AM and adding one for indexing.
    let [hour, minute] = time.slice(0, time.length - 1).split(':').map(s => Number(s));
    if (time.endsWith('p') && hour != 12) hour += 12;

    return hour * 60 + minute;
}
