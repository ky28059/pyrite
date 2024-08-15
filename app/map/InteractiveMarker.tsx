import { InfoWindow, Marker } from '@react-google-maps/api';
import type { Section } from '@/util/unitime';
import type { Building } from '@/util/buildings';


type InteractiveMarkerProps = {
    building: Building
    classes: Section[]
    openBuilding: string
    setOpenBuilding: (openId: string) => void
}
export default function InteractiveMarker(props: InteractiveMarkerProps) {
    return (
        <Marker
            key={props.building.abbr}
            position={{ lat: props.building.lat, lng: props.building.lng }}
            label={props.classes.length > 1 ? props.classes.length.toString() : undefined}
            onClick={() => props.setOpenBuilding(props.building.abbr)}
        >
            {props.openBuilding === props.building.abbr && (
                <InfoWindow
                    position={{ lat: props.building.lat, lng: props.building.lng }}
                    onCloseClick={() => props.setOpenBuilding('')}
                >
                    <div className="flex gap-2 overflow-x-auto overflow-y-clip w-max">
                        {props.classes.map((c) => (
                            <p>{c.names.join('')}</p>
                        ))}
                    </div>
                </InfoWindow>
            )}
        </Marker>
    )
}
