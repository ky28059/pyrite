'use client'

import {useState} from 'react';
import {DateTime, Interval} from 'luxon';

// Components
import BoilerLinkEventModal, {trimBoilerLinkDescription} from '@/app/(home)/BoilerLinkEventModal';

// Utils
import type {BoilerLinkEventData} from '@/util/boilerlink';


export default function ScheduleBoilerLinkEvent(props: BoilerLinkEventData) {
    const [open, setOpen] = useState(false);

    const start = DateTime.fromISO(props.startsOn);
    const end = DateTime.fromISO(props.endsOn);
    const interval = Interval.fromDateTimes(start, end);

    const isSameDay = start.hasSame(end, 'day');
    if (!isSameDay) return null; // TODO

    const midnight = start.startOf('day');
    const s = start.diff(midnight, 'minutes').minutes;
    const e = end.diff(midnight, 'minutes').minutes;

    return (
        <>
            <button
                className="border-l-4 z-10 text-left rounded px-4 py-3 hover:ring-4 transition duration-100 focus:outline-none focus-visible:ring-[3px] border-[#73C2FB] text-[#73C2FB] bg-[#73C2FB]/30 hover:ring-blue-500/30"
                onClick={() => setOpen(true)}
                style={{
                    gridRowStart: s / 5 - 84 + 1,
                    gridRowEnd: e / 5 - 84 + 1,
                    gridColumnStart: 2
                }}
            >
                <section className="flex gap-2 sm:gap-4">
                    <h3 className="font-semibold font-lg line-clamp-1">
                        {props.name}
                    </h3>

                    <div className="flex gap-1 flex-none text-xs font-semibold">
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {interval.toLocaleString(DateTime.DATETIME_MED)}
                        </p>
                        <p className="rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {props.location}
                        </p>
                    </div>
                </section>

                <p className="font-light text-sm line-clamp-2">
                    {trimBoilerLinkDescription(props.description)}
                </p>
            </button>

            <BoilerLinkEventModal
                {...props}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}
