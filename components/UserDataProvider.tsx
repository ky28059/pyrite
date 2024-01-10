'use client'

import {ReactNode, useLayoutEffect, useState} from 'react';
import {defaultUserData, UserData, UserDataContext} from '@/contexts/UserDataContext';


// Local-caching & cloud-backed algorithm borrowed from
// https://github.com/SVWEFSBRWHWBCOTSEID/game-website/blob/main/components/PreferencesProvider.tsx
export default function UserDataProvider(props: {children: ReactNode}) {
    const [data, setData] = useState(defaultUserData);

    // Load saved preferences from `localStorage` on mount
    useLayoutEffect(() => {
        const raw = localStorage.getItem('data');
        if (!raw) return localStorage.setItem('data', JSON.stringify(data));

        setData(JSON.parse(raw));
    }, []);

    function setLocalData(newData: UserData) {
        localStorage.setItem('data', JSON.stringify(newData));
        setData(newData);
    }

    return (
        <UserDataContext.Provider value={{data, setData: setLocalData}}>
            {props.children}
        </UserDataContext.Provider>
    )
}
