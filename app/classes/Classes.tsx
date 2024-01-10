'use client'

import {useMemo, useState} from 'react';
import Class from '@/app/classes/Class';
import type {Section} from '@/util/unitime';


export default function Classes(props: {classes: Section[]}) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        // Allow filtering by course name (e.g. "SCLA 101") and course title (e.g. "Crit Think & Com").
        const classes = query === ''
            ? props.classes
            : props.classes.filter(c => c.courseTitles.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                || c.courseNames.some((n) => n.toLowerCase().includes(query.toLowerCase())))

        // Sort first by course name (e.g. "SCLA 101"), then by section id (e.g. "10670-P09"). Assumedly, two courses
        // with the same name also have the same title.
        return classes.sort((a, b) => a.courseNames[0].localeCompare(b.courseNames[0])
            || a.externalIds[0].localeCompare(b.externalIds[0]));
    }, [query])

    return (
        <div>
            <section className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded px-3 py-1.5 focus:outline-none focus-visible:ring-[3px] w-[36rem] mb-1"
                    placeholder="Search classes by name (SCLA 101) or title (Multivariate Calculus)"
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
