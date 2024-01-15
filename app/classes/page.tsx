import Classes from '@/app/classes/Classes';
import YourClasses from '@/app/classes/YourClasses';

// Utils
import {loadClasses} from '@/util/unitime';
import type {Metadata} from 'next';


export const metadata: Metadata = {
    title: 'Classes'
}

export default async function ClassesPage() {
    const classes = await loadClasses();

    return (
        <>
            <h1 className="text-4xl font-bold mb-3">
                Classes
            </h1>

            <div className="flex gap-16">
                <Classes classes={classes} />
                <YourClasses classes={classes} />
            </div>
        </>
    )
}
