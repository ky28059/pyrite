'use client'

import { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

// Components
import HomeClock from '@/app/(home)/HomeClock';
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';
import NextClassProgressBar from '@/app/(home)/NextClassProgressBar';
import BoilerLinkEvent from '@/app/(home)/BoilerLinkEvent';
import DayAlert from '@/app/(home)/DayAlert';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import EventsContext from '@/contexts/EventsContext';

// Utils
import type { Section } from '@/util/unitime';
import { fetchEvents } from '@/util/boilerlink';
import { ZONE } from '@/util/schedule';


type HomeContentProps = {
    classes: { [p: string]: Section }
}
export default function HomeContent(props: HomeContentProps) {
    const [viewDate, setViewDate] = useState(DateTime.now().setZone(ZONE).startOf('day'));

    // Current time check to see if viewDate is not the current date
    const time = useContext(CurrentTimeContext);
    const currDate = time.setZone(ZONE).startOf('day');

    const jumpToPres = () => setViewDate(currDate);
    const relDays = viewDate.diff(currDate, 'days').days;

    // BoilerLink events
    const { events: eventsMap, setEventsForDay } = useContext(EventsContext);
    const events = eventsMap[viewDate.toISODate()!];

    useEffect(() => {
        fetchEvents(viewDate.toISO()!)
            .then((res) => setEventsForDay(viewDate.toISODate()!, res.value))
            .catch((e) => { /* TODO */ });
    }, [viewDate]);

    return (
        <main className="relative pt-16 pb-24 sm:pt-24 flex-grow">
            {relDays !== 0 && (
                <DayAlert
                    daysRelToCur={relDays}
                    jumpToPres={jumpToPres}
                />
            )}

            <div className="flex flex-col xl:flex-row gap-x-8 gap-y-12 xl:pr-8">
                <div className="flex-grow">
                    <div className="xl:pl-8">
                        <HomeClock />
                        <HomeDatePicker
                            viewDate={viewDate}
                            setViewDate={setViewDate}
                            classes={props.classes}
                        />
                    </div>

                    <NextClassProgressBar classes={props.classes} />
                    <Calendar
                        viewDate={viewDate}
                        daysRelToCur={relDays}
                        classes={props.classes}
                    />
                </div>

                <div className="container xl:p-0 h-max xl:sticky xl:top-12 flex flex-col gap-2 flex-none xl:w-80 xl:max-h-[calc(100vh_-_5rem)]">
                    <h3 className="flex gap-1.5 items-center font-semibold text-lg mb-1">
                        BoilerLink Events
                        <span className="font-normal text-base">({viewDate.toLocaleString()})</span>

                        {events && events.length > 0 && (
                            <span className="text-xs font-semibold rounded-full px-1.5 py-0.5 bg-theme/30 text-theme">
                                {events.length}
                            </span>
                        )}
                    </h3>

                    <div className="flex flex-col gap-2 overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary xl:pr-2">
                        {!events ? (
                            <p className="text-sm text-secondary">
                                Loading events...
                            </p>
                        ) : events.length === 0 ? (
                            <p className="text-sm text-secondary">
                                No events to show.
                            </p>
                        ) : events.map((e) => (
                            <BoilerLinkEvent {...e} key={e.id} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
