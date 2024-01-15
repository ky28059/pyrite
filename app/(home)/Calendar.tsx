'use client'

import {useContext, useEffect, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import ScheduleClass from '@/app/(home)/ScheduleClass';
import ScheduleMeal from '@/app/(home)/ScheduleMeal';

// Utils
import UserDataContext from '@/contexts/UserDataContext';
import type {MealsResponse} from '@/util/menus';
import type {Section} from '@/util/unitime';


type CalendarProps = {
    viewDate: DateTime,
    classes: Section[]
};
export default function Calendar(props: CalendarProps) {
    const {data} = useContext(UserDataContext);

    const [meals, setMeals] = useState<MealsResponse[] | null>(null);
    useEffect(() => {
        fetch(`/api/menu/${props.viewDate.toISODate()}`).then(res => res.json()).then(res => {
            console.log(res);
            setMeals(res);
        });
    }, [props.viewDate]);

    return (
        <div className="relative grid grid-rows-[repeat(144,_0.5rem)] grid-cols-[3.75rem_1fr_0.5rem] sm:grid-cols-[4.75rem_1fr_2rem]">
            <ScheduleMeal start="7:00a" end="10:00a" meal="Breakfast" meals={meals} viewDate={props.viewDate} />
            <ScheduleMeal start="11:00a" end="2:00p" meal="Lunch" meals={meals} viewDate={props.viewDate} />
            <ScheduleMeal start="5:00p" end="9:00p" meal="Dinner" meals={meals} viewDate={props.viewDate} />

            {/* Hour labels */}
            {Array(12).fill(0).map((_, i) => (
                <p
                    style={{gridRowStart: i * 12 + 1, gridColumnStart: 1}}
                    className="text-sm text-secondary dark:text-secondary-dark -mt-2 text-right pr-6 select-none pointer-events-none"
                    key={i}
                >
                    {data.options.time === '12' ? (
                        `${i + 7 > 12 ? i - 5 : i + 7}:00 ${i + 7 >= 12 ? 'PM' : 'AM'}`
                    ) : (
                        `${i + 7}:00`
                    )}
                </p>
            ))}

            {/* Horizontal rules (one every two grid rows, or 10 minutes) */}
            {/* TODO: incredibly hacky */}
            <div className="absolute inset-0 flex flex-col pl-12 sm:pl-16 pointer-events-none">
                {Array(72).fill(0).map((_, i) => (
                    <hr className="h-4 border-t border-tertiary dark:border-tertiary-dark" key={i} />
                ))}
            </div>

            {/* Classes */}
            {props.classes.map(c => (
                <ScheduleClass {...c} key={c.sections[0]} />
            ))}
        </div>
    )
}
