'use client'

import {useContext} from 'react';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


export default function HomeClock() {
    const time = useContext(CurrentTimeContext);

    return (
        <div>
            {time.toISOTime()}
        </div>
    )
}
