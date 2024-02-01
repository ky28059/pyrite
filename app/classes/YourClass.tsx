'use client'

import {useState} from 'react';
import ClassModal from '@/app/classes/ClassModal';
import type {Section} from '@/util/unitime';


export default function YourClass(props: Section) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className={'px-5 py-3 rounded bg-content-secondary dark:bg-content-secondary-dark border text-left transition duration-150 border-tertiary dark:border-tertiary-dark hover:!border-theme'}
                onClick={() => setOpen(true)}
            >
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        {props.sections.map((id, i) => (
                            <h3 className="font-semibold text-sm text-pretty" key={id}>
                                {props.names[i]}: {props.titles[i]} ({id})
                            </h3>
                        ))}
                    </div>

                    <div className="bg-theme/30 dark:bg-theme-dark/30 text-theme dark:text-theme-dark text-xs px-2 py-0.5 mt-0.5 h-max rounded-full font-semibold">
                        {props.type}
                    </div>
                </div>

                <p className="font-light text-xs mb-0.5 text-secondary dark:text-[#BABABA]">
                    {props.dayOfWeek} {props.start}-{props.end} @ {props.location}
                </p>
            </button>

            <ClassModal
                {...props}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}
