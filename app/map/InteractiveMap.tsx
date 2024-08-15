"use client"

import { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// Utils
import type { Building } from '@/util/buildings';


type InteractiveMapProps = {
    buildings: Building[]
}
export default function InteractiveMap(props: InteractiveMapProps) {
    const [openBuilding, setOpenBuilding] = useState('');

    const mapContainerStyle = {
        height: "100%",
        width: "100%",
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    })

    if (!isLoaded) return <div>Loading....</div>
    return (
        <GoogleMap
            zoom={15}
            mapContainerStyle={mapContainerStyle}
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
            {/* TODO */}
        </GoogleMap>
    )
}
