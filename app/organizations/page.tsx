import {Metadata} from 'next';
import {getPlaiceholder} from 'plaiceholder';
import Organizations from '@/app/organizations/Organizations';
import {fetchOrganizations} from '@/util/boilerlink';


export const metadata: Metadata = {
    title: 'Organizations',
    openGraph: {
        title: 'Organizations'
    }
}

export default async function OrganizationsPage() {
    const res = await fetchOrganizations();

    // Generate all pfp blur URLs
    const blurUrls: {[key: string]: string} = {};
    for (const o of res.value) {
        if (!o.ProfilePicture) continue;

        const buf = await (await fetch(`https://se-images.campuslabs.com/clink/images/${o.ProfilePicture}?preset=small-sq`)).arrayBuffer();
        const {base64} = await getPlaiceholder(Buffer.from(buf));

        blurUrls[o.Id] = base64;
    }

    return (
        <Organizations
            organizations={res.value}
            blurUrls={blurUrls}
            count={res['@odata.count']}
        />
    )
}
