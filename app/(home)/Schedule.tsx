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
    // TODO: caching?
    const [events, setEvents] = useState<BoilerLinkEventData[] | null>(null);
    useEffect(() => {
        setEvents(null);
        fetch(`/api/events/${viewDate.toISO()}`)
            .then((res) => res.json())
            .then((res: EventsResponse) => setEvents(res.value));
    }, [viewDate]);

    return (
        <div>
            <HomeDatePicker
                viewDate={viewDate}
                setViewDate={setViewDate}
            />

            <div className="flex flex-col xl:flex-row gap-12">
                <div className="flex-grow">
                    <NextClassProgressBar />
                    <Calendar
                        viewDate={viewDate}
                        classes={filtered}
                    />
                </div>

                <div className="flex flex-col gap-2 flex-none xl:w-80">
                    <h3 className="font-semibold text-lg mb-1">
                        BoilerLink Events{' '}
                        <span className="font-normal text-base">({viewDate.toLocaleString()})</span>
                    </h3>

                    {!events ? (
                        <p className="text-sm text-secondary dark:text-secondary-dark">
                            Loading events...
                        </p>
                    ) : events.length === 0 ? (
                        <p className="text-sm text-secondary dark:text-secondary-dark">
                            No events to show.
                        </p>
                    ) : events.map((e) => (
                        <BoilerLinkEvent {...e} key={e.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
