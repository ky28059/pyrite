import Image from 'next/image';
import {BoilerLinkOrganizationData} from '@/util/boilerlink';


type OrganizationProfilePictureProps = BoilerLinkOrganizationData & {
    blurUrl: string
}
export default function OrganizationProfilePicture(props: OrganizationProfilePictureProps) {
    if (props.ProfilePicture) return (
        <Image
            src={`https://se-images.campuslabs.com/clink/images/${props.ProfilePicture}?preset=small-sq`}
            blurDataURL={props.blurUrl}
            className="rounded-full flex-none h-max"
            alt={props.Name}
            width={75}
            height={75}
        />
    )

    return (
        <div className="size-[75px] bg-content-secondary dark:bg-content-secondary-dark rounded-full flex items-center justify-center text-3xl flex-none text-secondary dark:text-secondary-dark font-semibold">
            {props.Name[0]}
        </div>
    )
}
