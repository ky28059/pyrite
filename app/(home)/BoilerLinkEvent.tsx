'use client'

import {useState} from 'react';
import he from 'he';
import CenteredModal from '@/components/CenteredModal';
import type {BoilerLinkEventData} from '@/util/boilerlink';

// Icons
import {FaLocationDot} from 'react-icons/fa6';
import {BsPeopleFill} from 'react-icons/bs';


export default function BoilerLinkEvent(props: BoilerLinkEventData) {
    const [open, setOpen] = useState(false);
    const imageSrc = `https://se-images.campuslabs.com/clink/images/${props.imagePath ?? props.organizationProfilePicture}?preset=med-w`

    return (
        <>
            <button
                className="flex rounded overflow-hidden border border-tertiary dark:border-tertiary-dark text-sm hover:border-primary dark:hover:border-primary-dark transition duration-200 text-left items-stretch"
                onClick={() => setOpen(true)}
            >
                <img
                    src={imageSrc}
                    className="w-20 object-cover object-center flex-none"
                    alt={props.name}
                />

                <div className="px-4 py-2 flex-grow">
                    <h5 className="font-medium line-clamp-2">{props.name}</h5>

                    <p className="text-xs text-secondary dark:text-secondary-dark">
                        {props.organizationName}
                    </p>
                    <p className="text-xs text-secondary dark:text-secondary-dark">
                        @ {props.location}
                    </p>
                </div>
            </button>

            <CenteredModal
                isOpen={open}
                setIsOpen={setOpen}
                className="relative flex flex-col bg-content dark:bg-content-dark rounded-md w-[48rem] max-h-[90%] mx-2 shadow-xl"
            >
                <img
                    src={imageSrc}
                    className="w-full h-48 object-cover object-center rounded-t-md"
                    alt={props.name}
                />

                <div className="py-6 px-8 sm:px-10 overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary dark:scrollbar-thumb:bg-tertiary-dark">
                    <h1 className="font-bold text-2xl mb-2">
                        {props.name}
                    </h1>

                    {(props.categoryNames.length > 0 || props.benefitNames.length > 0) && (
                        <div className="flex gap-1 text-xs font-semibold mb-1.5">
                            {props.categoryNames.map((c) => (
                                <p className="rounded-full bg-yellow-500/30 text-theme dark:text-theme-dark px-2 py-1 flex-none" key={c}>
                                    {c}
                                </p>
                            ))}
                            {props.benefitNames.map((b) => (
                                <p className="rounded-full bg-yellow-500/30 text-theme dark:text-theme-dark px-2 py-1 flex-none" key={b}>
                                    {b}
                                </p>
                            ))}
                        </div>
                    )}

                    <p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">
                        <BsPeopleFill /> {props.organizationName}
                    </p>
                    <p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">
                        <FaLocationDot /> {props.location}
                    </p>

                    <div className="text-sm space-y-2 mt-4">
                        {decodeBoilerLinkDescription(props.description)}
                    </div>

                    <a
                        className="block mt-4 text-sm text-secondary dark-text-secondary-dark italic hover:underline"
                        href={`https://boilerlink.purdue.edu/event/${props.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View event on BoilerLink
                    </a>
                </div>
            </CenteredModal>
        </>
    )
}

function decodeBoilerLinkDescription(desc: string) {
    // TODO: support <strong>, <em>, <span>, <ul>, etc.?
    const lines = he.decode(desc)
        .replaceAll(/<(?:p|li|\/?div|\/?strong|\/?em|\/?span|\/?ul).*?>/g, '')
        .split(/<\/(?:p|li)>/);

    return lines.slice(0, lines.length - 1).map((t) => <p>{t}</p>);
}
