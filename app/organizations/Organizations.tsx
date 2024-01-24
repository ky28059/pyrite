'use client'

import {useContext, useMemo, useState} from 'react';
import Organization from '@/app/organizations/Organization';
import UserDataContext from '@/contexts/UserDataContext';
import type {BoilerLinkOrganizationData} from '@/util/boilerlink';


type OrganizationsProps = {
    organizations: BoilerLinkOrganizationData[],
    count: number
}
export default function Organizations(props: OrganizationsProps) {
    const [query, setQuery] = useState('');
    const {data} = useContext(UserDataContext);

    const pinned = useMemo(() => {
        return props.organizations.filter((o) => data.pinnedOrgIds.includes(o.Id))
    }, [data.pinnedOrgIds]);

    const filtered = useMemo(() => {
        const unpinned = props.organizations.filter((o) => !data.pinnedOrgIds.includes(o.Id));

        // Allow filtering by org name, or short name.
        return query === ''
            ? unpinned
            : unpinned.filter(c => c.Name.toLowerCase().includes(query.toLowerCase())
                || c.ShortName?.toLowerCase().includes(query.toLowerCase()));
    }, [query, data.pinnedOrgIds]);

    return (
        <div>
            <section className="mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-tertiary dark:border-tertiary-dark rounded px-3 py-1.5 focus:outline-none focus-visible:ring-[3px] w-full mb-1 dark:bg-content-secondary-dark placeholder:text-secondary dark:placeholder:text-secondary-dark"
                    placeholder="Search organizations"
                />
                <p className="text-xs font-light text-secondary dark:text-secondary-dark">
                    Viewing {filtered.length + pinned.length} of {props.count} organizations.
                </p>
            </section>

            <div className="flex flex-col gap-4">
                {pinned.length !== 0 && pinned.map((o) => (
                    <Organization {...o} key={o.Id} />
                ))}
                {pinned.length !== 0 && (
                    <hr className="border-tertiary dark:border-tertiary-dark my-4" />
                )}
                {filtered.map((o) => (
                    <Organization {...o} key={o.Id} />
                ))}
            </div>
        </div>
    )
}
