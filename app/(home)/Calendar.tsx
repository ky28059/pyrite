'use client'

import {useEffect, useState} from 'react';
import {DateTime} from 'luxon';

// Components
import ScheduleClass from '@/app/(home)/ScheduleClass';
import ScheduleMeal from '@/app/(home)/ScheduleMeal';

// Utils
import {getMenu, MealsResponse} from '@/util/menus';
import type {Section} from '@/util/unitime';


type CalendarProps = {
    viewDate: DateTime,
    classes: Section[]
};
export default function Calendar(props: CalendarProps) {
    const [meals, setMeals] = useState<MealsResponse[] | null>(null);
    useEffect(() => {
        Promise.all([
            getMenu(props.viewDate, 'Wiley'),
            getMenu(props.viewDate, 'Ford'),
            getMenu(props.viewDate, 'Hillenbrand'),
            getMenu(props.viewDate, 'Earhart'),
            getMenu(props.viewDate, 'Windsor'),
        ]).then(res => {
            console.log(res);
            setMeals(res);
        });
    }, [props.viewDate]);

    return (
        <div className="relative grid grid-rows-[repeat(144,_0.5rem)] grid-cols-[3.75rem_1fr_0.5rem] sm:grid-cols-[4.75rem_1fr_2rem]">
            <ScheduleMeal start="7:00a" end="10:00a" meal="Breakfast" meals={meals} />
            <ScheduleMeal start="11:00a" end="2:00p" meal="Lunch" meals={meals} />
            <ScheduleMeal start="5:00p" end="9:00p" meal="Dinner" meals={meals} />

            {/* Hour labels */}
            {Array(12).fill(0).map((_, i) => (
                <p
                    style={{gridRowStart: i * 12 + 1, gridColumnStart: 1}}
                    className="text-sm text-secondary dark:text-secondary-dark -mt-2 text-right pr-6 select-none pointer-events-none"
                    key={i}
                >
                    {i + 7}:00
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
