'use client'

import Link from 'next/link';

// Components
import YourClass from '@/app/classes/YourClass';

// Utils
import useUserClasses from '@/hooks/useUserClasses';
import type { Section } from '@/util/unitime';


type YourClassesProps = {
    classes: { [p: string]: Section }
}
export default function YourClasses(props: YourClassesProps) {
    const courseIds = useUserClasses(props.classes);

    return (
        <div className="hidden sm:flex sm:flex-col sticky w-96 h-max top-20 -mt-12 max-h-[calc(100vh_-_9rem)]">
            <h2 className="text-2xl font-bold mb-4 flex gap-1.5 items-end">
                Your classes
                {courseIds.length > 0 && (
                    <span className="font-normal text-xl">({courseIds.length})</span>
                )}
            </h2>

            {courseIds.length === 0 ? (
                <p className="text-secondary font-light italic text-sm text-pretty">
                    No classes to show. Add classes by selecting them on the left.
                </p>
            ) : (
                <>
                    <div className="flex flex-col gap-2.5 min-h-0 overflow-y-auto pr-1 scrollbar:w-1 scrollbar-thumb:bg-tertiary">
                        {courseIds.sort().map((id) => (
                            <YourClass {...props.classes[id]} key={id} />
                        ))}
                    </div>
                    <p className="text-secondary text-sm mt-2.5">
                        Added classes will appear in your{' '}
                        <Link href="/" className="text-theme hover:underline">schedule</Link>.
                    </p>
                </>
            )}
        </div>
    )
}
