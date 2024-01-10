'use client'

import {useContext} from 'react';
import {useIsMounted} from '@/hooks/useIsMounted';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


export default function HomeClock() {
    const time = useContext(CurrentTimeContext);
    const mounted = useIsMounted();

    return (
        <div>
            {mounted ? time.toISOTime() : ''}
        </div>
    )
}
