'use client'

import {useContext} from 'react';
import {FiCheck, FiCircle} from 'react-icons/fi';

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
            className={'px-5 py-4 rounded flex gap-4 items-center bg-content-secondary dark:bg-content-secondary-dark border text-left transition duration-150 ' + (selected ? 'bg-theme/20 dark:bg-theme-dark/20 border-theme' : 'border-tertiary dark:border-tertiary-dark hover:!border-theme')}
            onClick={toggleSelected}
        >
            {selected ? (
                <FiCheck className="w-6 h-6 bg-gray-400/25 dark:bg-white/10 rounded-full p-1 flex-none" />
            ) : (
                <FiCircle className="w-6 h-6 text-transparent bg-tertiary dark:bg-white/10 rounded-full p-0.5 flex-none" />
            )}

            <div>
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        {props.sections.map((id, i) => (
                            <h3 className="font-semibold font-lg" key={id}>
                                {props.names[i]}: {props.titles[i]} ({id})
                            </h3>
                        ))}
                    </div>

                    <div className="bg-theme/30 dark:bg-theme-dark/30 text-theme dark:text-theme-dark text-xs px-2 py-0.5 mt-0.5 h-max rounded-full font-semibold">
                        {props.type}
                    </div>
                </div>

                <p className="font-light text-sm mb-0.5 text-secondary dark:text-[#BABABA]">
                    {props.dayOfWeek} {props.start}-{props.end} @ {props.location}
                </p>

                {props.instructors?.map((name, i) => (
                    <p className="font-light text-sm text-secondary dark:text-[#BABABA]" key={name}>
                        {name}{props.emails[i] && <> ({props.emails[i]})</>}
                    </p>
                ))}
            </div>
        </button>
    )
}
