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
        <>
            <h1 className="text-4xl font-bold mb-3">
                Organizations
            </h1>

            <Organizations
                organizations={res.value}
                count={res['@odata.count']}
            />
        </>
    )
}
