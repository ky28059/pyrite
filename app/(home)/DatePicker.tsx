'use client'

import { useContext, useEffect, useRef } from 'react';
import { Popover } from '@headlessui/react';
import { DateTime } from 'luxon';

// Components
import AnimatedPopover from '@/components/AnimatedPopover';

// Contexts
import CurrentTimeContext from '@/contexts/CurrentTimeContext';
import UserDataContext from '@/contexts/UserDataContext';
import EventsContext from '@/contexts/EventsContext';

// Utils
import type { Section } from '@/util/unitime';
import { getPeriodsForDay, YEAR_END, YEAR_START, ZONE } from '@/util/schedule';
import { useIsMounted } from '@/hooks/useIsMounted';


type DatePickerProps = {
    viewDate: DateTime,
    setViewDate: (d: DateTime) => void,
    start?: DateTime,
    end?: DateTime,
    classes: { [p: string]: Section }
}
export default function DatePicker(props: DatePickerProps) {
    const mounted = useIsMounted();

    return (
        <Popover className="relative flex flex-col">
            <Popover.Button className="h-9 w-64 flex items-center justify-center cursor-pointer focus:outline-none border-b border-tertiary hover:border-primary transition duration-200">
                {/* TODO: loading UI */}
                {mounted ? props.viewDate.toLocaleString(DateTime.DATE_HUGE) : ''}
            </Popover.Button>
            <AnimatedPopover className="flex justify-center z-20">
                <Calendar
                    className="top-[calc(100%_+_10px)]"
                    currTime={props.viewDate}
                    setTime={props.setViewDate}
                    start={props.start}
                    end={props.end}
                    classes={props.classes}
                />
            </AnimatedPopover>
        </Popover>
    )
}

// Ported mostly from https://github.com/GunnWATT/watt/blob/b84912add397b1187dc931e96b2dfac29f547ffc/client/src/components/schedule/DateSelector.tsx
type CalendarProps = {
    start?: DateTime, end?: DateTime,
    currTime: DateTime, setTime: (day: DateTime) => any,
    classes: { [p: string]: Section },
    className?: string
}
function Calendar(props: CalendarProps) {
    const { start, end, currTime, setTime, className } = props;

    const { data } = useContext(UserDataContext);
    const { events } = useContext(EventsContext);

    const date = useContext(CurrentTimeContext);
    const today = date.setZone(ZONE).startOf('day');
    const tmrw = today.plus({ days: 1 });

    // Wrapper and month refs for auto-centering on current selected month
    const wrapper = useRef<HTMLDivElement>(null);
    const currMonth = useRef<HTMLDivElement>(null);

    // Autoscroll the calendar to the current date
    useEffect(() => {
        if (!wrapper.current) return;
        if (!currMonth.current) return;

        // Set wrapper's scroll position to the offset of the current month, minus the day header and 1rem gap
        wrapper.current.scrollTop = currMonth.current.offsetTop - 48 - 16;
    }, [wrapper, currMonth])

    // Function to set the day without modifying the hour or minutes
    const setDate = (day: DateTime) => setTime(currTime.set({ year: day.year, ordinal: day.ordinal }));

    const weekdays = ['U', 'M', 'T', 'W', 'θ', 'F', 'S'];

    const START = start ?? YEAR_START;
    const END = end ?? YEAR_END;

    const startMonth = (START.month - 1) + START.year * 12;
    const endMonth = (END.month - 1) + END.year * 12;

    // Map months to rendered HTML
    const monthElements = Array(endMonth - startMonth + 1).fill(0).map((_, i) => startMonth + i).map(m => {
        const year = Math.floor(m / 12);
        const month = m % 12

        // TODO: can this be better accomplished with another constructor?
        const startOfMonth = DateTime.fromFormat(`${year}-${month + 1}`, "yyyy-M", { zone: ZONE });

        const days = Array(startOfMonth.daysInMonth).fill(0)
            .map((_, i) => i + 1)
            // TODO: see todo above
            .map(day => DateTime.fromFormat(`${year}-${month + 1}-${day}`, "yyyy-M-d", { zone: ZONE }))
            .filter(day => !(day < START || day > END));

        return (
            <div key={`month ${m}`} ref={currTime.month - 1 === month ? currMonth : undefined}>
                <h4 className="text-[0.8rem] text-center mb-0.5">
                    {startOfMonth.toFormat('MMMM yyyy')}
                </h4>
                <div className="grid grid-cols-7">
                    {days.map((day, i) => {
                        const noSchool = getPeriodsForDay(day, data, props.classes, events).length === 0;

                        const active = currTime.hasSame(day, 'day');
                        return (
                            <button
                                className={'flex items-center justify-center cursor-pointer py-0.5' + (noSchool && !active ? ' text-secondary' : '') + (active ? ' bg-theme text-white rounded-full' : '')}
                                onClick={() => setDate(day)}
                                key={day.toISO()}
                                style={i === 0 ? { gridColumnStart: (day.weekday % 7) + 1 } : undefined}
                            >
                                {day.day}
                            </button>
                        );
                    })}
                </div>
            </div>
        )
    });

    return (
        <div className={"w-[300px] h-max max-h-[60vh] bg-content z-20 rounded flex flex-col shadow-2xl absolute" + (className ? ` ${className}` : '')}>
            <section className="grid grid-cols-7 px-4 pt-2.5 pb-1.5 bg-content-secondary rounded-t">
                {weekdays.map((char, i) => (
                    <div className="flex items-center justify-center p-1" key={char + i}>{char}</div>
                ))}
            </section>

            <section
                className="flex flex-col gap-4 px-4 py-3 overflow-auto scroll-smooth scrollbar:w-1 scrollbar-thumb:bg-tertiary"
                ref={wrapper}
            >
                {monthElements}
            </section>

            <section className="flex justify-between px-4 pt-1.5 pb-2.5 bg-content-secondary rounded-b">
                <button onClick={() => setDate(today)}>Today</button>
                <button onClick={() => setDate(tmrw)}>Tomorrow</button>
            </section>
        </div>
    )
}
