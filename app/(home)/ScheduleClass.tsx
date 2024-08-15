'use client'

import { useState } from 'react';
import ClassModal from '@/app/classes/ClassModal';

// Utils
import type { Section } from '@/util/unitime';
import { HOUR_START, SectionPeriod } from '@/util/schedule';


export default function ScheduleClass(props: SectionPeriod) {
    const { s, e, section } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className={'border-l-4 z-10 text-left rounded px-4 py-3 hover:ring-4 transition duration-100 focus:outline-none focus-visible:ring-[3px] ' + getBgStyle(section)}
                onClick={() => setOpen(true)}
                style={{
                    gridRowStart: minutesToGridRows(s),
                    gridRowEnd: minutesToGridRows(e),
                    gridColumnStart: 2
                }}
            >
                <section className="flex gap-2 sm:gap-4">
                    <div className="flex flex-col">
                        {section.sections.map((id, i) => (
                            <h3 className="font-semibold font-lg line-clamp-1" key={id}>
                                {section.names[i]}: {section.titles[i]} ({id})
                            </h3>
                        ))}
                    </div>

                    <div className="flex gap-1 flex-none text-xs font-semibold h-max">
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {section.type}
                        </p>
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {section.start}-{section.end}
                        </p>
                        <p className="rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {section.location}
                        </p>
                    </div>
                </section>

                {section.instructors?.map((name, i) => (
                    <p className="font-light text-sm" key={name}>
                        {name}{section.emails[i] && (
                            <> ({section.emails[i]})</>
                        )}
                    </p>
                ))}
            </button>

            <ClassModal
                {...section}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

/**
 * Parses a quantity of minutes into its corresponding number of grid row ticks (multiples of 5 minutes).
 * @param m The minutes (after midnight) to convert.
 * @returns The number of grid rows this time represents.
 */
export function minutesToGridRows(m: number) {
    return m / 5 - (HOUR_START * 12) + 1
}

function getBgStyle(s: Section) {
    switch (s.type) {
        case 'Lecture':
        case 'Lecture (Hybrid)':
            return 'border-theme text-theme bg-theme/30 hover:ring-yellow-500/30'
        case 'Laboratory':
        case 'Laboratory (Hybrid)':
            return 'border-laboratory text-laboratory bg-laboratory/30 hover:ring-laboratory/30'
        case 'Pso':
            return 'border-pso text-pso bg-pso/30 hover:ring-pso/30'
        case "Recitation":
        case "Recitation (Hybrid)":
            return 'border-recitation text-recitation bg-recitation/30 hover:ring-recitation/30'
        default: // TODO: travel time?
            return ''
    }
}
