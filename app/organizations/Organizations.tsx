'use client'

import {useMemo, useState} from 'react';
import Organization from '@/app/organizations/Organization';
import {BoilerLinkOrganizationData} from '@/util/boilerlink';


type OrganizationsProps = {
    organizations: BoilerLinkOrganizationData[],
    count: number
}
export default function Organizations(props: OrganizationsProps) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        // Allow filtering by org name, or short name.
        return query === ''
            ? Object.values(props.organizations)
            : Object.values(props.organizations).filter(c => c.Name.toLowerCase().includes(query.toLowerCase())
                || c.ShortName?.toLowerCase().includes(query.toLowerCase()));
    }, [query])

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
                    Viewing {filtered.length} of {props.count} organizations.
                </p>
            </section>

            <div className="flex flex-col gap-4">
                {filtered.map((o) => (
                    <Organization {...o} key={o.Id} />
                ))}
            </div>
        </div>
    )
}
