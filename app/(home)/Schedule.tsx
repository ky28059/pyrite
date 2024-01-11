'use client'

import {useContext, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';

// Utils
import UserDataContext from '@/contexts/UserDataContext';
import {parseTime} from '@/app/(home)/ScheduleClass';
import type {Section} from '@/util/unitime';
import ClassIndicator from '@/app/(home)/ClassIndicator';


export default function Schedule(props: {classes: {[id: string]: Section}}) {
    const {data} = useContext(UserDataContext);
    const [viewDate, setViewDate] = useState(DateTime.now().startOf('day'));

    // Filter classes by weekday, sort by start time
    const filtered = data.courseIds.map((id) => props.classes[id]).filter((c) => {
        switch (viewDate.weekday) {
            case 1: return c.dayOfWeek.includes('M');
            case 2: return /T(?!h)/.test(c.dayOfWeek);
            case 3: return c.dayOfWeek.includes('W');
            case 4: return c.dayOfWeek.includes('Th');
            case 5: return c.dayOfWeek.includes('F');
        }
        return false;
    }).sort((a, b) => parseTime(a.start) - parseTime(b.start));

    return (
        <div>
            <HomeDatePicker
                viewDate={viewDate}
                setViewDate={setViewDate}
            />

            <ClassIndicator classes={filtered} />
            <Calendar classes={filtered} />
        </div>
    )
}
