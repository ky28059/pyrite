'use client'

import {useState} from 'react';

// Components
import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';

// Utils
import type {BoilerLinkOrganizationData} from '@/util/boilerlink';
import {decodeBoilerLinkDescription} from '@/app/(home)/BoilerLinkEvent';


export default function Organization(props: BoilerLinkOrganizationData) {
    const [open, setOpen] = useState(false);
    const imageSrc = `https://se-images.campuslabs.com/clink/images/${props.ProfilePicture}?preset=small-sq`

    return (
        <>
            <button
                className="flex gap-5 text-left"
                onClick={() => setOpen(true)}
            >
                {props.ProfilePicture ? (
                    <img
                        src={imageSrc}
                        className="rounded-full flex-none h-max"
                        alt={props.Name}
                    />
                ) : (
                    <div
                        className="size-[75px] bg-content-secondary dark:bg-content-secondary-dark rounded-full flex items-center justify-center text-3xl flex-none text-secondary dark:text-secondary-dark font-semibold">
                        {props.Name[0]}
                    </div>
                )}

                <div>
                    <h5 className="font-semibold">{props.Name}</h5>
                    <p className="text-sm text-secondary dark:text-secondary-dark line-clamp-2">
                        {props.Summary}
                    </p>
                </div>
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

                <h1 className="flex gap-4 items-center font-bold text-2xl text-pretty mb-3">
                    <img
                        src={imageSrc}
                        className="rounded-full flex-none h-max"
                        alt={props.Name}
                    />
                    {props.Name}
                </h1>

                {props.CategoryNames.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-xs font-semibold mb-1.5">
                        {props.CategoryNames.map((c) => (
                            <p className="rounded-full bg-yellow-500/30 text-theme dark:text-theme-dark px-2 py-1 flex-none" key={c}>
                                {c}
                            </p>
                        ))}
                    </div>
                )}

                {/*<div className="bg-yellow-500/30 text-theme dark:text-theme-dark text-xs px-2 py-0.5 mb-2 h-max w-max rounded-full font-semibold">*/}
                {/*    {props.type}*/}
                {/*</div>*/}

                {/*<p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">*/}
                {/*    <BsPeopleFill /> {props.instructors.join(', ')}*/}
                {/*</p>*/}
                {/*<p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">*/}
                {/*    <FaLocationDot /> {props.location}*/}
                {/*</p>*/}
                {/*<p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">*/}
                {/*    <FaCalendar /> {props.dayOfWeek} {props.start}-{props.end}*/}
                {/*</p>*/}

                <div className="text-sm space-y-2 mt-4">
                    {decodeBoilerLinkDescription(props.Description ?? props.Summary ?? '')}
                </div>
            </CenteredModal>
        </>
    )
}
