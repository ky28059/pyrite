'use client'

import { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

// Components
import ScheduleClass from '@/app/(home)/ScheduleClass';
import ScheduleMeal from '@/app/(home)/ScheduleMeal';
import ScheduleIndicator from '@/app/(home)/ScheduleIndicator';
import ScheduleBoilerLinkEvent from '@/app/(home)/ScheduleBoilerLinkEvent';
import ScheduleTest from '@/app/(home)/ScheduleTest';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';
import EventsContext from '@/contexts/EventsContext';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';

// Utils
import type { MealsResponse } from '@/util/menus';
import { getPeriodsForDay, HOUR_END, HOUR_START, ZONE } from '@/util/schedule';


type CalendarProps = {
    viewDate: DateTime,
    daysRelToCur: number
};
export default function Calendar(props: CalendarProps) {
    const { data } = useContext(UserDataContext);
    const classes = useContext(ClassesContext);
    const { events } = useContext(EventsContext);

    const time = useContext(CurrentTimeContext);
    const timeEst = time.setZone(ZONE);

    const [meals, setMeals] = useState<MealsResponse[] | null>(null);
    useEffect(() => {
        fetch(`/api/menu/${props.viewDate.toISODate()}`).then(res => res.json()).then(res => {
            console.log(res);
            setMeals(res);
        });
    }, [props.viewDate]);

    const periods = getPeriodsForDay(props.viewDate, data, classes, events);

    return (
        <div
            className="relative grid grid-cols-[4.5rem_1fr_0.5rem] sm:grid-cols-[7rem_1fr_2rem]"
            style={{ gridTemplateRows: `repeat(${(HOUR_END - HOUR_START) * 12 + 1}, 0.5rem)` }}
        >
            <ScheduleMeal start="7:00a" end="10:00a" meal="Breakfast" meals={meals} viewDate={props.viewDate} />
            <ScheduleMeal start="11:00a" end="2:00p" meal="Lunch" meals={meals} viewDate={props.viewDate} />
            <ScheduleMeal start="5:00p" end="9:00p" meal="Dinner" meals={meals} viewDate={props.viewDate} />

            {/* Hour labels */}
            {Array(HOUR_END - HOUR_START + 1).fill(0).map((_, i) => (
                <p
                    style={{
                        gridRowStart: i * 12 + 1,
                        gridColumnStart: 1,
                        opacity: tickMarkHidden(timeEst, i + HOUR_START) ? 0 : 1
                    }}
                    className="text-xs text-secondary dark:text-secondary-dark -mt-2 text-right pr-6 select-none pointer-events-none"
                    key={i}
                >
                    {data.options.time === '12' ? (
                        `${i + HOUR_START > 12 ? i + HOUR_START - 12 : i + HOUR_START} ${i + HOUR_START >= 12 ? 'PM' : 'AM'}`
                    ) : (
                        `${i + HOUR_START}:00`
                    )}
                </p>
            ))}

            {/* Horizontal rules (one every two grid rows, or 10 minutes) */}
            {/* TODO: incredibly hacky */}
            <div className="absolute inset-0 flex flex-col ml-14 sm:ml-[6rem] pointer-events-none">
                {Array((HOUR_END - HOUR_START) * 6 + 1).fill(0).map((_, i) => (
                    <hr
                        className={'h-4 flex-none border-t border-tertiary dark:border-tertiary-dark' + (i % 6 !== 0 ? ' opacity-65' : '')}
                        key={i}
                    />
                ))}

                {props.daysRelToCur === 0 && (
                    // Only show schedule indicator if viewing current day
                    <ScheduleIndicator />
                )}
            </div>

            {/* Periods */}
            {periods.map((p) => {
                switch (p.type) {
                    case 'Event':
                        return <ScheduleBoilerLinkEvent {...p} key={p.event.id} />
                    case 'Midterm':
                    case 'Final':
                        return <ScheduleTest {...p} key={p.section.sections[0]} />
                    default:
                        return <ScheduleClass {...p} key={p.section.sections[0]} />
                }
            })}
        </div>
    )
}

/**
 * Gets whether the tick mark for the given hour should be hidden due to the indicator being too close to it.
 * @param time The current time (in `ZONE` tz).
 * @param hour The hour represented by the given tick (0-23).
 * @returns Whether the tick should be hidden.
 */
function tickMarkHidden(time: DateTime, hour: number) {
    const diff = time.hour - hour;
    if (diff !== 0 && diff !== -1) return false;

    return (diff === 0 && time.minute < 10)
        || (diff === -1 && time.minute > 50)
}
