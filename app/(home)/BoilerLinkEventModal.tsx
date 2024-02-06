'use client'

import {useContext} from 'react';
import {DateTime, Interval} from 'luxon';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';

// Components
import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';
import OutlineButton, {DangerOutlineButton} from '@/components/OutlineButton';

// Icons
import {BsPeopleFill} from 'react-icons/bs';
import {FaCalendar, FaLocationDot} from 'react-icons/fa6';

// Utils
import type {BoilerLinkEventData} from '@/util/boilerlink';
import UserDataContext from '@/contexts/UserDataContext';
import {themeToDefaultImageUrl} from '@/app/(home)/BoilerLinkEvent';


type BoilerLinkEventModalProps = BoilerLinkEventData & {
    open: boolean,
    setOpen: (b: boolean) => void
}
export default function BoilerLinkEventModal(props: BoilerLinkEventModalProps) {
    const {open, setOpen} = props;
    const {data, setData} = useContext(UserDataContext);

    const imageSrc = props.imagePath
        ? `https://se-images.campuslabs.com/clink/images/${props.imagePath}?preset=med-w`
        : themeToDefaultImageUrl(props.theme);

    const start = DateTime.fromISO(props.startsOn);
    const end = DateTime.fromISO(props.endsOn);

    const interval = Interval.fromDateTimes(start, end);

    function addToCalendar() {
        const newData = {...data};
        newData.eventIds = [...newData.eventIds, props.id];
        setData(newData);
        setOpen(false);
    }

    function removeFromCalendar() {
        const newData = {...data};
        newData.eventIds = newData.eventIds.filter((i) => i !== props.id);
        setData(newData);
        setOpen(false);
    }

    return (
        <CenteredModal
            isOpen={open}
            setIsOpen={setOpen}
            className="relative flex flex-col bg-content dark:bg-content-dark rounded-md w-[48rem] max-h-[90%] mx-2 shadow-xl"
        >
            <CloseButton
                className="absolute right-5 top-3"
                onClick={() => setOpen(false)}
            />

            <img
                src={imageSrc}
                className="w-full h-48 object-cover object-center rounded-t-md"
                alt={props.name}
            />

            <div className="py-6 px-8 sm:px-10 min-h-0 flex flex-col">
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
                    <FaCalendar />
                    {interval.toLocaleString(DateTime.DATETIME_MED)}
                </p>
                <p className="flex gap-2 items-center text-sm text-secondary dark:text-secondary-dark">
                    <FaLocationDot /> {props.location}
                </p>

                <div
                    className="text-sm space-y-2 mt-4 min-h-0 overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary dark:scrollbar-thumb:bg-tertiary-dark [&_a]:text-theme dark:[&_a]:text-theme-dark [&_a:hover]:underline"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.description)}}
                />

                <a
                    className="block mt-4 text-sm text-secondary dark-text-secondary-dark italic hover:underline w-max"
                    href={`https://boilerlink.purdue.edu/event/${props.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View event on BoilerLink
                </a>

                {!data.eventIds.includes(props.id) ? (
                    <OutlineButton className="mt-4 w-max" onClick={addToCalendar}>
                        Add to calendar
                    </OutlineButton>
                ) : (
                    <DangerOutlineButton className="mt-4 w-max" onClick={removeFromCalendar}>
                        Remove from calendar
                    </DangerOutlineButton>
                )}
            </div>
        </CenteredModal>
    )
}

export function trimBoilerLinkDescription(desc: string) {
    return he.decode(desc)
        .replaceAll(/<.+?>/g, '');
}
