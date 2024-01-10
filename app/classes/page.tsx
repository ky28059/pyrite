import type {Metadata} from 'next';
import {loadClasses} from '@/util/unitime';
import Class from '@/app/classes/Class';


export const metadata: Metadata = {
    title: 'Classes'
}

export default async function Classes() {
    const classes = await loadClasses();
    return (
        <div className="container flex flex-col gap-4">
            {classes.map(c => <Class {...c} key={c.eventId} />)}
        </div>
    )
}
