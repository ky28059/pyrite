'use client'

import {useContext, useEffect, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';
import NextClassProgressBar from '@/app/(home)/NextClassProgressBar';
import BoilerLinkEvent from '@/app/(home)/BoilerLinkEvent';
import DayAlert from '@/app/(home)/DayAlert';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';

// Utils
import type {BoilerLinkEventData, EventsResponse} from '@/util/boilerlink';
import {ZONE} from '@/util/schedule';


export default function Schedule() {
    const [viewDate, setViewDate] = useState<DateTime>(DateTime.now().startOf('day'));

    const classes = useContext(ClassesContext);
    const {data} = useContext(UserDataContext);

    // Current time check to see if viewDate is not the current date
    const time = useContext(CurrentTimeContext);
    const currDate = time.setZone(ZONE).startOf('day');

    const jumpToPres = () => setViewDate(currDate);
    const relDays = viewDate.diff(currDate, 'days').days;

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
            .then((res: EventsResponse) => setEvents(res.value))
            .catch((e) => {/* TODO */ });
    }, [viewDate]);

    return (
        <div>
            {relDays !== 0 && (
                <DayAlert
                    daysRelToCur={relDays}
                    jumpToPres={jumpToPres}
                />
            )}

            <HomeDatePicker
                viewDate={viewDate}
                setViewDate={setViewDate}
            />

            <div className="flex flex-col xl:flex-row gap-12">
                <div className="flex-grow">
                    <NextClassProgressBar />
                    <Calendar
                        viewDate={viewDate}
                        daysRelToCur={relDays}
                        classes={filtered}
                        events={events}
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
