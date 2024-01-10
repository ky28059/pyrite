'use client'

import {useContext} from 'react';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import {DateTime} from 'luxon';


export default function HomeDatePicker() {
    const time = useContext(CurrentTimeContext);

    return (
        <div className="flex gap-4 justify-center mb-10">
            {time.toLocaleString(DateTime.DATE_FULL)}
        </div>
    )
}
