'use client'

import { useContext } from 'react';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';

// Utils
import { useIsMounted } from '@/hooks/useIsMounted';
import { HOUR_END, HOUR_START, ZONE } from '@/util/schedule';


export default function ScheduleIndicator() {
    const { data } = useContext(UserDataContext);
    const format = data.options.time === '12' ? 'h:mm a' : 'H:mm';

    const time = useContext(CurrentTimeContext);
    const mounted = useIsMounted();

    const timeEst = time.setZone(ZONE);
    const diffZone = time.zoneName !== ZONE;

    // Don't display if the current time is not in the calendar range
    // or if we're not mounted (to prevent hydration errors).
    if (timeEst.hour < HOUR_START || timeEst.hour > HOUR_END - 1) return null;
    if (!mounted) return null;

    const midnight = timeEst.startOf('day');
    const minutes = timeEst.diff(midnight, 'minutes').minutes;

    // Start: HOUR_START, span: (HOUR_END - HOUR_START)
    const progress = (minutes - HOUR_START * 60) / ((HOUR_END - HOUR_START) * 60) * 100;

    return (
        <div
            style={{ top: `${progress}%` }}
            className="absolute inset-x-0 col-start-2 col-end-4 border-t border-red-500"
        >
            <p className="absolute right-full inset-y-0 my-auto h-max w-max text-xs text-red-500 text-right pr-3">
                {timeEst.toFormat(format)}
                {diffZone && (
                    <><br /> (EST)</>
                )}
            </p>
        </div>
    )
}
