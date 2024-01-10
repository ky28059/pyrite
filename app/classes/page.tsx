import type {Metadata} from 'next';
import Classes from '@/app/classes/Classes';
import {loadClasses} from '@/util/unitime';


export const metadata: Metadata = {
    title: 'Classes'
}

export default async function ClassesPage() {
    const classes = await loadClasses();

    return (
        <div className="container py-24">
            <h1 className="text-4xl font-bold mb-3">
                Classes
            </h1>

            <Classes classes={classes} />
        </div>
    )
}
