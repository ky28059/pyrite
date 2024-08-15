import type { Metadata } from 'next';

// Components
import Classes from '@/app/classes/Classes';
import YourClasses from '@/app/classes/YourClasses';

// Utils
import { classes } from '@/util/unitime';


export const metadata: Metadata = {
    title: 'Classes',
    openGraph: {
        title: 'Classes'
    }
}

export default function ClassesPage() {
    return (
        <main className="relative container pt-16 pb-24 sm:pt-24">
            <h1 className="text-4xl font-bold mb-3">
                Classes
            </h1>

            <div className="flex gap-16">
                <Classes classes={classes} />
                <YourClasses classes={classes} />
            </div>
        </main>
    )
}
