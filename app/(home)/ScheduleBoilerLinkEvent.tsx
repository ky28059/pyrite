'use client'

import {useState} from 'react';
import {DateTime, Interval} from 'luxon';

// Components
import BoilerLinkEventModal, {trimBoilerLinkDescription} from '@/app/(home)/BoilerLinkEventModal';

// Utils
import {EventPeriod} from '@/util/schedule';


export default function ScheduleBoilerLinkEvent(props: EventPeriod) {
    const {s, e, event} = props;
    const [open, setOpen] = useState(false);

    const start = DateTime.fromISO(event.startsOn);
    const end = DateTime.fromISO(event.endsOn);
    const interval = Interval.fromDateTimes(start, end);

    const isSameDay = start.hasSame(end, 'day');
    if (!isSameDay) return null; // TODO

    return (
        <>
            <button
                className="border-l-4 z-10 text-left rounded px-4 py-3 hover:ring-4 transition duration-100 focus:outline-none focus-visible:ring-[3px] border-event text-event bg-event/30 hover:ring-event/30"
                onClick={() => setOpen(true)}
                style={{
                    gridRowStart: s / 5 - 84 + 1,
                    gridRowEnd: e / 5 - 84 + 1,
                    gridColumnStart: 2
                }}
            >
                <section className="flex gap-2 sm:gap-4">
                    <h3 className="font-semibold font-lg line-clamp-1">
                        {event.name}
                    </h3>

                    <div className="flex gap-1 flex-none text-xs font-semibold">
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {interval.toLocaleString(DateTime.DATETIME_MED)}
                        </p>
                        <p className="rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {event.location}
                        </p>
                    </div>
                </section>

                <p className="font-light text-sm line-clamp-2">
                    {trimBoilerLinkDescription(event.description)}
                </p>
            </button>

            <BoilerLinkEventModal
                {...event}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}
