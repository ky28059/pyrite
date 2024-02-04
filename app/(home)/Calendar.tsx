'use client'

import {useContext, useEffect, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import ScheduleClass from '@/app/(home)/ScheduleClass';
import ScheduleMeal from '@/app/(home)/ScheduleMeal';
import ScheduleIndicator from '@/app/(home)/ScheduleIndicator';
import ScheduleBoilerLinkEvent from '@/app/(home)/ScheduleBoilerLinkEvent';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';
import EventsContext from '@/contexts/EventsContext';

// Utils
import type {MealsResponse} from '@/util/menus';
import {getPeriodsForDay} from '@/util/schedule';
import ScheduleMidterm from '@/app/(home)/ScheduleMidterm';


type CalendarProps = {
    viewDate: DateTime,
    daysRelToCur: number
};
export default function Calendar(props: CalendarProps) {
    const {data} = useContext(UserDataContext);
    const classes = useContext(ClassesContext);
    const {events} = useContext(EventsContext);

    const [meals, setMeals] = useState<MealsResponse[] | null>(null);
    useEffect(() => {
        fetch(`/api/menu/${props.viewDate.toISODate()}`).then(res => res.json()).then(res => {
            console.log(res);
            setMeals(res);
        });
    }, [props.viewDate]);

    const periods = getPeriodsForDay(props.viewDate, data, classes, events);

    return (
        <div className="-mx-2 relative grid grid-rows-[repeat(144,_0.5rem)] grid-cols-[4rem_1fr_0.5rem] sm:grid-cols-[5rem_1fr_2rem]">
            <ScheduleMeal start="7:00a" end="10:00a" meal="Breakfast" meals={meals} viewDate={props.viewDate} />
            <ScheduleMeal start="11:00a" end="2:00p" meal="Lunch" meals={meals} viewDate={props.viewDate} />
            <ScheduleMeal start="5:00p" end="9:00p" meal="Dinner" meals={meals} viewDate={props.viewDate} />

            {/* Hour labels */}
            {Array(12).fill(0).map((_, i) => (
                <p
                    style={{gridRowStart: i * 12 + 1, gridColumnStart: 1}}
                    className="text-xs text-secondary dark:text-secondary-dark -mt-2 text-right pr-6 select-none pointer-events-none"
                    key={i}
                >
                    {data.options.time === '12' ? (
                        `${i + 7 > 12 ? i - 5 : i + 7} ${i + 7 >= 12 ? 'PM' : 'AM'}`
                    ) : (
                        `${i + 7}:00`
                    )}
                </p>
            ))}

            {/* Horizontal rules (one every two grid rows, or 10 minutes) */}
            {/* TODO: incredibly hacky */}
            <div className="absolute inset-0 flex flex-col ml-14 sm:ml-[4.5rem] pointer-events-none">
                {Array(72).fill(0).map((_, i) => (
                    <hr className="h-4 border-t border-tertiary dark:border-tertiary-dark" key={i} />
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
                        return <ScheduleMidterm {...p} key={p.section.sections[0]} />
                    default:
                        return <ScheduleClass {...p} key={p.section.sections[0]} />
                }
            })}
        </div>
    )
}
