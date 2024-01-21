import type {Metadata} from 'next';
import Classes from '@/app/classes/Classes';
import YourClasses from '@/app/classes/YourClasses';


export const metadata: Metadata = {
    title: 'Classes',
    openGraph: {
        title: 'Classes'
    }
}

export default async function ClassesPage() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-3">
                Classes
            </h1>

            <div className="flex gap-16">
                <Classes />
                <YourClasses />
            </div>
        </>
    )
}
