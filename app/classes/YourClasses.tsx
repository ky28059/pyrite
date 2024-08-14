'use client'

import { useContext } from 'react';
import YourClass from '@/app/classes/YourClass';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';
import Link from 'next/link';


export default function YourClasses() {
    const classes = useContext(ClassesContext);
    const { data } = useContext(UserDataContext);

    return (
        <div className="hidden sm:flex sm:flex-col sticky w-96 h-max top-20 -mt-12 max-h-[calc(100vh_-_9rem)]">
            <h2 className="text-2xl font-bold mb-4 flex gap-1.5 items-end">
                Your classes
                {data.courseIds.length > 0 && (
                    <span className="font-normal text-xl">({data.courseIds.length})</span>
                )}
            </h2>

            {data.courseIds.length === 0 ? (
                <p className="text-secondary dark:text-secondary-dark font-light italic text-sm">
                    No classes to show. Add classes by selecting them on the left.
                </p>
            ) : (
                <>
                    <div className="flex flex-col gap-2.5 min-h-0 overflow-y-auto pr-1 scrollbar:w-1 scrollbar-thumb:bg-tertiary dark:scrollbar-thumb:bg-tertiary-dark">
                        {data.courseIds.sort().map((id) => (
                            <YourClass {...classes[id]} key={id} />
                        ))}
                    </div>
                    <p className="text-secondary dark:text-secondary-dark text-sm mt-2.5">
                        Added classes will appear in your{' '}
                        <Link href="/" className="text-theme dark:text-theme-dark hover:underline">schedule</Link>.
                    </p>
                </>
            )}
        </div>
    )
}
