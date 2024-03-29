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
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import EventsContext from '@/contexts/EventsContext';

// Utils
import type {EventsResponse} from '@/util/boilerlink';
import {ZONE} from '@/util/schedule';


export default function Schedule() {
    const [viewDate, setViewDate] = useState<DateTime>(DateTime.now().startOf('day'));

    // Current time check to see if viewDate is not the current date
    const time = useContext(CurrentTimeContext);
    const currDate = time.setZone(ZONE).startOf('day');

    const jumpToPres = () => setViewDate(currDate);
    const relDays = viewDate.diff(currDate, 'days').days;

    // BoilerLink events
    const {events: eventsMap, setEventsForDay} = useContext(EventsContext);
    const events = eventsMap[viewDate.toISODate()!];

    useEffect(() => {
        fetch(`/api/events/${viewDate.toISO()}`)
            .then((res) => res.json())
            .then((res: EventsResponse) => setEventsForDay(viewDate.toISODate()!, res.value))
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
                    />
                </div>

                <div className="flex flex-col gap-2 flex-none xl:w-80 xl:max-h-[1448px] xl:-mr-2">
                    <h3 className="flex gap-1.5 items-center font-semibold text-lg mb-1">
                        BoilerLink Events
                        <span className="font-normal text-base">({viewDate.toLocaleString()})</span>

                        {events && events.length > 0 && (
                            <span className="text-xs font-semibold rounded-full px-1.5 py-0.5 bg-theme/30 dark:bg-theme-dark/30 text-theme dark:text-theme-dark">
                                {events.length}
                            </span>
                        )}
                    </h3>

                    <div className="flex flex-col gap-2 overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary dark:scrollbar-thumb:bg-tertiary-dark xl:pr-2">
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
        </div>
    )
}
