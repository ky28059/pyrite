'use client'

import { useContext } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';


export default function HomeClock() {
    const time = useContext(CurrentTimeContext);
    const mounted = useIsMounted();

    const { data } = useContext(UserDataContext);
    const format = data.options.time === '12' ? 'h:mm:ss a' : 'H:mm:ss'

    return (
        <div className="text-3xl text-center font-semibold mb-2">
            {/* TODO: loading UI */}
            {mounted ? time.toFormat(format) : ''}
        </div>
    )
}
