'use client'

import {ReactNode, useState} from 'react';
import EventsContext, {Events} from '@/contexts/EventsContext';
import type {BoilerLinkEventData} from '@/util/boilerlink';


export default function EventsProvider(props: {children: ReactNode}) {
    const [events, setEvents] = useState<Events>({});

    function setEventsForDay(date: string, data: BoilerLinkEventData[]) {
        const newEvents = {...events, [date]: data};
        setEvents(newEvents);

        // TODO: cache
    }

    return (
        <EventsContext.Provider value={{events, setEventsForDay}}>
            {props.children}
        </EventsContext.Provider>
    )
}
