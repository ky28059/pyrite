'use client'

import {useMemo, useState} from 'react';
import Class from '@/app/classes/Class';
import type {Section} from '@/util/unitime';


export default function Classes(props: {classes: Section[]}) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const classes = query === ''
            ? props.classes
            : props.classes.filter(c => c.courseTitles.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                || c.courseNames.some((n) => n.toLowerCase().includes(query.toLowerCase())))

        return classes.sort((a, b) => a.courseNames[0].localeCompare(b.courseNames[0]));
    }, [query])

    return (
        <div>
            <section className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded px-3 py-1.5 focus:outline-none focus-visible:ring-[3px] mb-1"
                    placeholder="Search classes"
                />
                <p className="text-xs font-light">
                    Viewing {Math.min(100, filtered.length)} of {filtered.length} courses.
                </p>
            </section>

            <section className="flex flex-col gap-4">
                {filtered.slice(0, 100).map(c => <Class {...c} key={c.eventId} />)}
            </section>
        </div>
    )
}
