import type { BoilerLinkOrganizationData } from '@/util/boilerlink';


export default function OrganizationProfilePicture(props: BoilerLinkOrganizationData) {
    return props.ProfilePicture ? (
        <img
            src={`https://se-images.campuslabs.com/clink/images/${props.ProfilePicture}?preset=small-sq`}
            className="rounded-full flex-none h-max"
            alt={props.Name}
        />
    ) : (
        <div
            className="size-[75px] bg-content-secondary rounded-full flex items-center justify-center text-3xl flex-none text-secondary font-semibold">
            {props.Name[0]}
        </div>
    )
}
