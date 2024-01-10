'use client'

import {useContext} from 'react';
import {useIsMounted} from '@/hooks/useIsMounted';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


export default function HomeClock() {
    const time = useContext(CurrentTimeContext);
    const mounted = useIsMounted();

    return (
        <div className="text-3xl text-center font-semibold mb-4">
            {mounted ? time.toFormat('h:mm:ss a') : ''}
        </div>
    )
}
