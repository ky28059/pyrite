"use client"

import { useContext, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';

// Utils
import type { Building } from '@/util/buildings';
import InteractiveMarker from '@/app/map/InteractiveMarker';


type InteractiveMapProps = {
    buildings: Building[]
}
export default function InteractiveMap(props: InteractiveMapProps) {
    const { data } = useContext(UserDataContext);
    const classes = useContext(ClassesContext);

    const [openBuilding, setOpenBuilding] = useState('');

    // User classes, grouped by building code. Assumes that the first word in the course `location` field is the
    // building abbreviation (e.g. WALC).
    const groupedUserClasses = Object.groupBy(
        data.courseIds.map((i) => classes[i]),
        (c) => c.location.split(' ')[0]
    );

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
                // styles: [
                //     {
                //         featureType: "all",
                //         elementType: "labels",
                //         stylers: [{ visibility: "off" }],
                //     },
                // ],
            }}
            onClick={() => setOpenBuilding('')}
        >
            {Object.entries(groupedUserClasses).map(([code, classes]) => (
                <InteractiveMarker
                    building={props.buildings.find((b) => b.abbr === code)!}
                    classes={classes!}
                    openBuilding={openBuilding}
                    setOpenBuilding={setOpenBuilding}
                />
            ))}
        </GoogleMap>
    )
}
