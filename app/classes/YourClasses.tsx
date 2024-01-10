'use client'

import {useContext} from 'react';
import Class from '@/app/classes/Class';

// Utils
import UserDataContext from '@/contexts/UserDataContext';
import type {Section} from '@/util/unitime';


export default function YourClasses(props: {classes: {[id: string]: Section}}) {
    const {data} = useContext(UserDataContext);

    return (
        <div className="w-96 sticky h-max top-24">
            <h2 className="text-2xl font-bold mb-4">Your classes</h2>

            {data.courseIds.length === 0 ? (
                <p className="font-light italic text-sm">
                    No classes to show. Add classes by selecting them on the left.
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {data.courseIds.map((id) => (
                        <Class {...props.classes[id]} key={id} />
                    ))}
                </div>
            )}
        </div>
    )
}
