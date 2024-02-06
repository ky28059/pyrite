'use client'

import {useState} from 'react';
import {DateTime, Interval} from 'luxon';

// Components
import BoilerLinkEventModal from '@/app/(home)/BoilerLinkEventModal';

// Utils
import type {BoilerLinkEventData, EventTheme} from '@/util/boilerlink';


export default function BoilerLinkEvent(props: BoilerLinkEventData) {
    const [open, setOpen] = useState(false);

    const imageSrc = props.imagePath
        ? `https://se-images.campuslabs.com/clink/images/${props.imagePath}?preset=med-w`
        : themeToDefaultImageUrl(props.theme);

    const start = DateTime.fromISO(props.startsOn);
    const end = DateTime.fromISO(props.endsOn);
    const interval = Interval.fromDateTimes(start, end);

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
                        {interval.toLocaleString(DateTime.DATETIME_MED)}
                    </p>
                    <p className="text-xs text-secondary dark:text-secondary-dark">
                        @ {props.location}
                    </p>
                </div>
            </button>

            <BoilerLinkEventModal
                {...props}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

export function themeToDefaultImageUrl(theme: EventTheme) {
    switch (theme) {
        case 'CommunityService':
            return 'https://static.campuslabsengage.com/discovery/images/events/service.jpg';
        case 'Athletics':
            return 'https://static.campuslabsengage.com/discovery/images/events/athletics.jpg';
        case 'Social':
            return 'https://static.campuslabsengage.com/discovery/images/events/social.jpg';
        case 'Arts':
            return 'https://static.campuslabsengage.com/discovery/images/events/artsandmusic.jpg';
        default:
            return 'https://static.campuslabsengage.com/discovery/images/events/learning.jpg';
    }
}
