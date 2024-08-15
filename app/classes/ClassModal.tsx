'use client'

import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';

// Icons
import { BsPeopleFill } from 'react-icons/bs';
import { FaCalendar, FaLocationDot } from 'react-icons/fa6';

// Utils
import type { Section } from '@/util/unitime';


type ClassModalProps = Section & {
    open: boolean,
    setOpen: (o: boolean) => void
}
export default function ClassModal(props: ClassModalProps) {
    const { open, setOpen } = props;

    return (
        <CenteredModal
            isOpen={open}
            setIsOpen={setOpen}
            className="relative flex flex-col bg-content rounded-md w-[48rem] max-h-[90%] mx-2 py-6 px-8 sm:px-10 shadow-xl overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary"
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

            <div className="bg-theme/30 text-theme text-xs px-2 py-0.5 mb-2 h-max w-max rounded-full font-semibold">
                {props.type}
            </div>

            {props.instructors.length > 0 && (
                <p className="flex gap-2 items-center text-sm text-secondary">
                    <BsPeopleFill /> {props.instructors.join(', ')}
                </p>
            )}
            <p className="flex gap-2 items-center text-sm text-secondary">
                <FaLocationDot /> {props.location}
            </p>
            <p className="flex gap-2 items-center text-sm text-secondary">
                <FaCalendar /> {props.dayOfWeek} {props.start}-{props.end}
            </p>

            {props.midterms.length > 0 && (
                <section className="flex flex-col gap-2 mt-5">
                    <h3 className="font-medium text-xs text-secondary">
                        Midterm exams ({props.midterms.reduce((s, m) => s + m.length, 0)})
                    </h3>
                    {props.midterms.map((g, i) => (
                        g.map((m) => (
                            <div className="bg-content-secondary rounded px-3 py-1.5">
                                <h5 className="text-sm">
                                    Midterm {i + 1}
                                </h5>
                                <p className="text-xs text-secondary">
                                    {m.dayOfWeek} {m.date} {m.start} - {m.end} @ {m.location}
                                </p>
                            </div>
                        ))
                    ))}
                </section>
            )}

            {props.finals.length > 0 && (
                <section className="flex flex-col gap-2 mt-5">
                    <h3 className="font-medium text-xs text-secondary">
                        Final exam ({props.finals.length})
                    </h3>
                    {props.finals.map((m) => (
                        <div className="bg-content-secondary rounded px-3 py-1.5">
                            <h5 className="text-sm">
                                Final
                            </h5>
                            <p className="text-xs text-secondary">
                                {m.dayOfWeek} {m.date} {m.start} - {m.end} @ {m.location}
                            </p>
                        </div>
                    ))}
                </section>
            )}
        </CenteredModal>
    )
}
