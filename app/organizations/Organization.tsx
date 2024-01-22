import {BoilerLinkOrganizationData} from '@/util/boilerlink';


export default function Organization(props: BoilerLinkOrganizationData) {
    return (
        <div className="flex gap-5">
            {props.ProfilePicture ? (
                <img
                    src={`https://se-images.campuslabs.com/clink/images/${props.ProfilePicture}?preset=small-sq`}
                    className="rounded-full flex-none h-max"
                    alt={props.Name}
                />
            ) : (
                <div className="size-[75px] bg-content-secondary dark:bg-content-secondary-dark rounded-full flex items-center justify-center text-3xl flex-none text-secondary dark:text-secondary-dark font-semibold">
                    {props.Name[0]}
                </div>
            )}

            <div>
                <h5 className="font-semibold">{props.Name}</h5>
                <p className="text-sm text-secondary dark:text-secondary-dark line-clamp-2">
                    {props.Summary}
                </p>
            </div>
        </div>
    )
}
