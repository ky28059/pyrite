'use client'

import {useContext} from 'react';

// Utils
import UserDataContext from '@/contexts/UserDataContext';
import type {Section} from '@/util/unitime';


export default function Class(props: Section) {
    const {data, setData} = useContext(UserDataContext);
    const selected = data.courseIds.includes(props.sections[0]);

    function toggleSelected() {
        const newIds = selected
            ? data.courseIds.filter(s => s !== props.sections[0])
            : [...data.courseIds, props.sections[0]]
        setData({...data, courseIds: newIds});
    }

    return (
        <button
            className={'px-6 py-3 rounded border text-left transition duration-150 ' + (selected ? 'bg-theme/20 border-theme' : 'border-tertiary dark:border-secondary-dark hover:!border-theme')}
            onClick={toggleSelected}
        >
            <section className="flex gap-2">
                <div className="flex flex-col">
                    {props.sections.map((id, i) => (
                        <h3 className="font-semibold font-lg" key={id}>
                            {props.names[i]}: {props.titles[i]} ({id})
                        </h3>
                    ))}
                </div>

                <div className="bg-zinc-800 dark:bg-content-secondary-dark text-white text-xs px-2 py-0.5 mt-0.5 h-max rounded-full font-semibold">
                    {props.type}
                </div>
            </section>

            <p className="font-light text-sm mb-1 text-secondary dark:text-[#BABABA]">
                {props.dayOfWeek} {props.start}-{props.end} @ {props.location}
            </p>

            {props.instructors?.map((name, i) => (
                <p className="font-light text-sm text-secondary dark:text-[#BABABA]" key={name}>
                    {name}{props.emails[i] && (
                        <> (<a href={`mailto:${props.emails[i]}`} className="text-blue-500 font-normal hover:underline">{props.emails[i]}</a>)</>
                    )}
                </p>
            ))}
        </button>
    )
}
