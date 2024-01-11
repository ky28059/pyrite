'use client'

import {useContext, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';
import ClassIndicator from '@/app/(home)/ClassIndicator';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';

// Utils
import {parseUnitimeMinutes} from '@/hooks/useNextPeriod';
import type {Section} from '@/util/unitime';


export default function Schedule(props: {classes: {[id: string]: Section}}) {
    const [viewDate, setViewDate] = useState(DateTime.now().startOf('day'));

    const {data} = useContext(UserDataContext);
    const time = useContext(CurrentTimeContext)

    // Filtered `viewDate` classes by weekday
    const filtered = data.courseIds.map((id) => props.classes[id]).filter((c) => {
        switch (viewDate.weekday) {
            case 1: return c.dayOfWeek.includes('M');
            case 2: return /T(?!h)/.test(c.dayOfWeek);
            case 3: return c.dayOfWeek.includes('W');
            case 4: return c.dayOfWeek.includes('Th');
            case 5: return c.dayOfWeek.includes('F');
        }
        return false;
    });

    // Sorted current-day classes for progress indicator
    // TODO: better name for this and above perhaps
    const sorted = data.courseIds.map((id) => props.classes[id]).filter((c) => {
        switch (time.weekday) {
            case 1: return c.dayOfWeek.includes('M');
            case 2: return /T(?!h)/.test(c.dayOfWeek);
            case 3: return c.dayOfWeek.includes('W');
            case 4: return c.dayOfWeek.includes('Th');
            case 5: return c.dayOfWeek.includes('F');
        }
        return false;
    }).sort((a, b) => parseUnitimeMinutes(a.start) - parseUnitimeMinutes(b.start));

    return (
        <div>
            <HomeDatePicker
                viewDate={viewDate}
                setViewDate={setViewDate}
            />

            <ClassIndicator classes={sorted} />
            <Calendar classes={filtered} />
        </div>
    )
}
