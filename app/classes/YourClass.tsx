'use client'

import { useContext, useState } from 'react';

// Components
import ClassModal from '@/app/classes/ClassModal';

// Utils
import type { Section } from '@/util/unitime';
import UserDataContext from '@/contexts/UserDataContext';


export default function YourClass(props: Section) {
    const [open, setOpen] = useState(false);

    const { data, setData } = useContext(UserDataContext);
    function removeClass() {
        setData({ ...data, courseIds: data.courseIds.filter(s => s !== props.sections[0]) });
    }

    return (
        <>
            <button
                className={'px-5 py-3 rounded bg-content-secondary border text-left transition duration-150 border-tertiary hover:!border-theme'}
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

                    <div className="bg-theme/30 text-theme text-xs px-2 py-0.5 mt-0.5 h-max rounded-full font-semibold">
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
                removeClass={removeClass}
            />
        </>
    )
}
