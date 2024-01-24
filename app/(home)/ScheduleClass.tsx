'use client'

import {useState} from 'react';

// Components
import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';

// Utils
import type {Section} from '@/util/unitime';
import {parseUnitimeMinutes} from '@/hooks/useNextPeriod';

// Icons
import {FaCalendar, FaLocationDot} from 'react-icons/fa6';
import {BsPeopleFill} from 'react-icons/bs';


export default function ScheduleClass(props: Section) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                style={{gridRowStart: parseGridRows(props.start), gridRowEnd: parseGridRows(props.end), gridColumnStart: 2}}
                className={'border-l-4 z-10 text-left rounded px-4 py-3 hover:ring-4 transition duration-100 focus:outline-none focus-visible:ring-[3px] ' + getBgStyle(props)}
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
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {props.type}
                        </p>
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {props.start}-{props.end}
                        </p>
                        <p className="rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
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
                <CloseButton
                    className="absolute right-6 top-5"
                    onClick={() => setOpen(false)}
                />

                <div className="flex flex-col mb-1 pr-8">
                    {props.sections.map((id, i) => (
                        <h1 className="font-bold text-2xl text-pretty" key={id}>
                            {props.names[i]}: {props.titles[i]} ({id})
                        </h1>
                    ))}
                </div>

                <div className="bg-yellow-500/30 text-theme dark:text-theme-dark text-xs px-2 py-0.5 mb-2 h-max w-max rounded-full font-semibold">
                    {props.type}
                </div>

                <p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">
                    <BsPeopleFill /> {props.instructors.join(', ')}
                </p>
                <p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">
                    <FaLocationDot /> {props.location}
                </p>
                <p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">
                    <FaCalendar /> {props.dayOfWeek} {props.start}-{props.end}
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

function getBgStyle(s: Section) {
    switch (s.type) {
        case 'Lecture':
            return 'border-theme dark:border-theme-dark text-theme dark:text-theme-dark bg-theme/30 dark:bg-theme-dark/30 hover:ring-yellow-500/30'
        case 'Laboratory':
        case 'Laboratory (Hybrid)':
            return 'border-[#7851A9] text-[#7851A9] bg-[#7851A9]/30 hover:ring-purple-500/30'
        case 'Pso':
            return 'border-[#6A5ACD] text-[#6A5ACD] bg-[#6A5ACD]/30 hover:ring-purple-500/30'
        case "Recitation":
        case "Recitation (Hybrid)":
            return 'border-[#f56fa1] text-[#f56fa1] bg-[#f56fa1]/30 hover:ring-pink-500/30'
        default:
            return ''
    }
}
