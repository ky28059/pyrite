'use client'

import { useState } from 'react';
import ClassModal from '@/app/classes/ClassModal';

// Utils
import type { TestPeriod } from '@/util/schedule';
import { minutesToGridRows } from '@/app/(home)/ScheduleClass';


export default function ScheduleTest(props: TestPeriod) {
    const { s, e, section, test, type } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="border-l-4 z-10 text-left rounded px-4 py-3 hover:ring-4 transition duration-100 focus:outline-none focus-visible:ring-[3px] border-midterm text-midterm bg-midterm/30 hover:ring-midterm/30"
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

                    <div className="flex gap-1 flex-none text-xs font-semibold">
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {type}
                        </p>
                        <p className="hidden sm:block rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {test.start}-{test.end}
                        </p>
                        <p className="rounded-full bg-black/5 dark:bg-black/15 px-2 py-1 flex-none">
                            {test.location}
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
