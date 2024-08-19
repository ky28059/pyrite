import { Marker, OverlayView } from '@react-google-maps/api';
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
                <OverlayView
                    position={{ lat: props.building.lat, lng: props.building.lng }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    // getPixelPositionOffset={getPixelPositionOffset}
                >
                    <div>
                        <div className="popup-bubble">
                            <div className="w-max max-w-md bg-content px-5 py-4 rounded-lg shadow-xl">
                                <h1 className="text-lg font-semibold mb-1">
                                    {props.building.name} ({props.building.abbr})
                                </h1>

                                {props.classes.map((c) => (
                                    <p>{c.names.join(' / ')}</p>
                                ))}
                            </div>
                        </div>
                        <div className="popup-bubble-anchor" />
                    </div>
                </OverlayView>
            )}
        </Marker>
    )
}
