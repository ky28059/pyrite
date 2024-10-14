"use client"

import { useContext, useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// Components
import InteractiveMarker from '@/app/map/InteractiveMarker';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';

// Utils
import type { Building } from '@/util/buildings';
import type { Section } from '@/util/unitime';
import { mapStyle, mapStyleDark } from '@/app/map/mapStyle';


type InteractiveMapProps = {
    buildings: Building[],
    theme?: string,
    classes: { [id: string]: Section }
}
export default function InteractiveMap(props: InteractiveMapProps) {
    const { data } = useContext(UserDataContext);

    // Use initial theme from cookies to avoid FOUC, but update theme on preferences change as well.
    const [theme, setTheme] = useState(props.theme);
    useEffect(() => {
        setTheme(data.options.theme);
    }, [data.options.theme]);

    const [openBuilding, setOpenBuilding] = useState('');

    // User classes, grouped by building code. Assumes that the first word in the course `location` field is the
    // building abbreviation (e.g. WALC).
    const groupedUserClasses = useMemo(() => {
        const ret: { [key: string]: Section[] } = {};
        const classes = data.courseIds.map((i) => props.classes[i]);

        for (const c of classes) {
            const key = c.location.split(' ')[0];
            if (!ret[key]) ret[key] = [];
            ret[key].push(c);
        }

        return ret;
    }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    })

    if (!isLoaded) return <p>Loading....</p>
    return (
        <GoogleMap
            zoom={15}
            mapContainerStyle={{
                flexGrow: "1",
                width: "100%",
            }}
            center={{ lat: 40.4237, lng: -86.9212 }}
            options={{
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                clickableIcons: false,
                zoomControl: false,
                styles: theme === 'dark' ? mapStyleDark : mapStyle
            }}
            onClick={() => setOpenBuilding('')}
        >
            {Object.entries(groupedUserClasses).map(([code, classes]) => (
                <InteractiveMarker
                    building={props.buildings.find((b) => b.abbr === code)!}
                    classes={classes!}
                    openBuilding={openBuilding}
                    setOpenBuilding={setOpenBuilding}
                    key={code}
                />
            ))}
        </GoogleMap>
    )
}
