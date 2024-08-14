'use client'

import { useState, ReactNode, useEffect } from 'react';
import { DateTime } from 'luxon';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


export default function CurrentTimeProvider(props: { children: ReactNode }) {
    const [time, setTime] = useState(DateTime.now());

    // Update current time every 100ms
    useEffect(() => {
        const id = setInterval(() => setTime(DateTime.now()), 100);
        return () => clearInterval(id);
    }, []);

    return (
        <CurrentTimeContext.Provider value={time}>
            {props.children}
        </CurrentTimeContext.Provider>
    )
}
