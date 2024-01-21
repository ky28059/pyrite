'use client'

import {useContext, useEffect, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';
import NextClassProgressBar from '@/app/(home)/NextClassProgressBar';
import BoilerLinkEvent from '@/app/(home)/BoilerLinkEvent';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';

// Utils
import type {BoilerLinkEventData, EventsResponse} from '@/util/boilerlink';


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

    // BoilerLink events
    const [events, setEvents] = useState<BoilerLinkEventData[]>([]);
    useEffect(() => {
        fetch(`/api/events/${viewDate.toISO()}`)
            .then((res) => res.json())
            .then((res: EventsResponse) => setEvents(res.value))
    }, [viewDate]);

    return (
        <div>
            <HomeDatePicker
                viewDate={viewDate}
                setViewDate={setViewDate}
            />

            <div className="flex gap-12">
                <div className="flex-grow">
                    <NextClassProgressBar />
                    <Calendar
                        viewDate={viewDate}
                        classes={filtered}
                    />
                </div>

                <div className="flex flex-col gap-2 w-80">
                    {events.map((e) => (
                        <BoilerLinkEvent {...e} key={e.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
