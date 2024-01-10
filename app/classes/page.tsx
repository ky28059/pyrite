import type {Metadata} from 'next';
import {loadClasses} from '@/util/unitime';
import Class from '@/app/classes/Class';


export const metadata: Metadata = {
    title: 'Classes'
}

export default async function Classes() {
    const classes = await loadClasses();
    return (
        <div className="container flex flex-col gap-4 py-24">
            <h1 className="text-4xl font-bold mb-6">
                Classes
            </h1>
            {classes.slice(0, 100).map(c => <Class {...c} key={c.eventId} />)}
        </div>
    )
}
