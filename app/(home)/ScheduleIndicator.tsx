'use client'

import {useContext} from 'react';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';
import {useIsMounted} from '@/hooks/useIsMounted';


export default function ScheduleIndicator() {
    const {data} = useContext(UserDataContext);
    const format = data.options.time === '12' ? 'h:mm a' : 'H:mm';

    const time = useContext(CurrentTimeContext);
    const mounted = useIsMounted();

    // Don't display if the current time is not in the calendar range (before 7:00 AM or after 7:00 PM)
    // or if we're not mounted (to prevent hydration errors).
    if (time.hour < 7 || time.hour > 19) return null;
    if (!mounted) return null;

    const midnight = time.startOf('day');
    const minutes = time.diff(midnight, 'minutes').minutes;

    // Start: 7:00 AM, span: 12 hours
    const progress = (minutes - 420) / 720 * 100;

    return (
        <div
            style={{top: `${progress}%`}}
            className="absolute inset-x-0 col-start-2 col-end-4 border-t border-red-500"
        >
            <p className="absolute right-full inset-y-0 my-auto h-max w-max text-xs text-red-500 text-right pr-3">
                {time.toFormat(format)}
            </p>
        </div>
    )
}
