'use client'

import {useState} from 'react';
import CenteredModal from '@/components/CenteredModal';

// Utils
import type {Section} from '@/util/unitime';
import {parseUnitimeMinutes} from '@/hooks/useNextPeriod';


export default function ScheduleClass(props: Section) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                style={{gridRowStart: parseGridRows(props.start), gridRowEnd: parseGridRows(props.end), gridColumnStart: 2}}
                className="z-10 bg-theme text-left text-white rounded px-4 py-3 hover:ring-4 hover:ring-yellow-500/30 transition duration-100"
                onClick={() => setOpen(true)}
            >
                <section className="flex gap-2 sm:gap-4">
                    <div className="flex flex-col">
                        {props.sections.map((id, i) => (
                            <h3 className="font-semibold font-lg line-clamp-1" key={id}>
                                {props.names[i]}: {props.titles[i]} ({id})
                            </h3>
                        ))}
                    </div>

                    <div className="flex gap-1 flex-none text-xs font-semibold">
                        <p className="hidden sm:block rounded-full bg-yellow-500 text-yellow-700 px-2 py-1 flex-none">
                            {props.type}
                        </p>
                        <p className="hidden sm:block rounded-full bg-yellow-500 text-yellow-700 px-2 py-1 flex-none">
                            {props.start}-{props.end}
                        </p>
                        <p className="rounded-full bg-yellow-500 text-yellow-700 px-2 py-1 flex-none">
                            {props.location}
                        </p>
                    </div>
                </section>

                {props.instructors?.map((name, i) => (
                    <p className="font-light text-sm" key={name}>
                        {name}{props.emails[i] && (
                            <> ({props.emails[i]})</>
                        )}
                    </p>
                ))}
            </button>

            <CenteredModal
                isOpen={open}
                setIsOpen={setOpen}
                className="relative flex flex-col bg-content dark:bg-content-dark rounded-md w-[48rem] max-h-[90%] mx-2 py-6 px-8 sm:px-10 shadow-xl"
            >
                <div className="flex flex-col mb-1">
                    {props.sections.map((id, i) => (
                        <h1 className="font-bold text-2xl" key={id}>
                            {props.names[i]}: {props.titles[i]} ({id})
                        </h1>
                    ))}
                </div>

                <div className="bg-zinc-800 dark:bg-content-secondary-dark text-white text-xs px-2 py-0.5 mb-2 h-max w-max rounded-full font-semibold">
                    {props.type}
                </div>

                <p className="text-sm text-secondary dark:text-secondary-dark">
                    <strong>Instructor(s):</strong> {props.instructors.join(', ')}
                </p>
                <p className="text-sm text-secondary dark:text-secondary-dark">
                    <strong>Location:</strong> {props.location}
                </p>
                <p className="text-sm text-secondary dark:text-secondary-dark">
                    <strong>Meeting times:</strong> {props.dayOfWeek} {props.start}-{props.end}
                </p>
            </CenteredModal>
        </>
    )
}

/**
 * Parses a UniTime time string into its corresponding number of grid row ticks (multiples of 5 minutes).
 * @param time The string to parse.
 * @returns The number of grid rows this time represents.
 */
export function parseGridRows(time: string) {
    const minutes = parseUnitimeMinutes(time);
    return minutes / 5 - 84 + 1;
}
