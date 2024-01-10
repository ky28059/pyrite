'use client'

import {useContext} from 'react';
import ScheduleClass from '@/app/(home)/ScheduleClass';

// Utils
import UserDataContext from '@/contexts/UserDataContext';
import type {Section} from '@/util/unitime';


export default function Calendar(props: {classes: {[id: string]: Section}}) {
    const {data} = useContext(UserDataContext);

    return (
        <div className="relative grid grid-rows-[repeat(144,_0.5rem)] grid-cols-[4rem_1fr_2rem]">
            {/* Hour labels */}
            {Array(12).fill(0).map((_, i) => (
                <p style={{gridRowStart: i * 12 + 1}} className="text-sm text-secondary dark:text-secondary-dark">
                    {i + 7}:00
                </p>
            ))}

            {/* Horizontal rules (one every two grid rows, or 10 minutes) */}
            {/* TODO: incredibly hacky */}
            <div className="-z-10 absolute inset-0 flex flex-col pl-12">
                {Array(72).fill(0).map((_, i) => (
                    <hr className="h-4 border-t border-tertiary dark:border-tertiary-dark" />
                ))}
            </div>

            {/* Classes */}
            {/* TODO: sort by weekday */}
            {data.courseIds.map((id) => (
                <ScheduleClass {...props.classes[id]} key={id} />
            ))}
        </div>
    )
}
