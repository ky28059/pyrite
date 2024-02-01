'use client'

import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';

// Icons
import {BsPeopleFill} from 'react-icons/bs';
import {FaCalendar, FaLocationDot} from 'react-icons/fa6';

// Utils
import type {Section} from '@/util/unitime';


type ClassModalProps = Section & {
    open: boolean,
    setOpen: (o: boolean) => void
}
export default function ClassModal(props: ClassModalProps) {
    const {open, setOpen} = props;

    return (
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
    )
}
