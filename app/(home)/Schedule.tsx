'use client'

import {useContext, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';
import NextClassProgressBar from '@/app/(home)/NextClassProgressBar';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';


export default function Schedule() {
    const [viewDate, setViewDate] = useState(DateTime.now().startOf('day'));

    const classes = useContext(ClassesContext);
    const {data} = useContext(UserDataContext);

    // Filtered `viewDate` classes by weekday
    const filtered = data.courseIds.map((id) => classes[id]).filter((c) => {
        switch (viewDate.weekday) {
            case 1: return c.dayOfWeek.includes('M');
            case 2: return /T(?!h)/.test(c.dayOfWeek);
            case 3: return c.dayOfWeek.includes('W');
            case 4: return c.dayOfWeek.includes('Th');
            case 5: return c.dayOfWeek.includes('F');
        }
        return false;
    });

    return (
        <div>
            <HomeDatePicker
                viewDate={viewDate}
                setViewDate={setViewDate}
            />

            <NextClassProgressBar />
            <Calendar
                viewDate={viewDate}
                classes={filtered}
            />
        </div>
    )
}
