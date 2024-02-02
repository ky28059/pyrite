import {createContext} from 'react';
import type {BoilerLinkEventData} from '@/util/boilerlink';


export type Events = {[date: string]: BoilerLinkEventData[]};
type EventsContext = {
    events: Events,
    setEventsForDay: (date: string, events: BoilerLinkEventData[]) => void
}

const EventsContext = createContext<EventsContext>({
    events: {},
    setEventsForDay: () => {}
});
export default EventsContext;
