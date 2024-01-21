import type {BoilerLinkEventData} from '@/util/boilerlink';


export default function BoilerLinkEvent(props: BoilerLinkEventData) {
    return (
        <div className="flex rounded border border-tertiary dark:border-tertiary-dark text-sm">
            <img
                src={`https://se-images.campuslabs.com/clink/images/${props.imagePath ?? props.organizationProfilePicture}?preset=med-w`}
                className="w-16 object-cover object-center flex-none"
            />

            <div className="px-4 py-2">
                <h5 className="font-medium">{props.name}</h5>

                <p className="text-xs text-secondary dark:text-secondary-dark">
                    {props.organizationName}
                </p>
                <p className="text-xs text-secondary dark:text-secondary-dark">
                    {props.location}
                </p>
            </div>
        </div>
    )
}
