import {Metadata} from 'next';
import {fetchOrganizations} from '@/util/boilerlink';
import Organizations from '@/app/organizations/Organizations';


export const metadata: Metadata = {
    title: 'Organizations',
    openGraph: {
        title: 'Organizations'
    }
}

export default async function OrganizationsPage() {
    const res = await fetchOrganizations();

    return (
        <Organizations
            organizations={res.value}
            count={res['@odata.count']}
        />
    )
}
