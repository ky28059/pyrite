'use client'

import { useContext } from 'react';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';

// Utils
import { useIsMounted } from '@/hooks/useIsMounted';
import { HOUR_END, HOUR_START } from '@/util/schedule';


export default function ScheduleIndicator() {
    const { data } = useContext(UserDataContext);
    const format = data.options.time === '12' ? 'h:mm a' : 'H:mm';

    const time = useContext(CurrentTimeContext);
    const mounted = useIsMounted();

    // Don't display if the current time is not in the calendar range
    // or if we're not mounted (to prevent hydration errors).
    if (time.hour < HOUR_START || time.hour > HOUR_END - 1) return null;
    if (!mounted) return null;

    const midnight = time.startOf('day');
    const minutes = time.diff(midnight, 'minutes').minutes;

    // Start: HOUR_START, span: (HOUR_END - HOUR_START)
    const progress = (minutes - HOUR_START * 60) / ((HOUR_END - HOUR_START) * 60) * 100;

    return (
        <div
            style={{ top: `${progress}%` }}
            className="absolute inset-x-0 col-start-2 col-end-4 border-t border-red-500"
        >
            <p className="absolute right-full inset-y-0 my-auto h-max w-max text-xs text-red-500 text-right pr-3">
                {time.toFormat(format)}
            </p>
        </div>
    )
}
