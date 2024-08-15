'use client'

import { ReactNode, useLayoutEffect, useState } from 'react';
import UserDataContext, { defaultUserData, UserData } from '@/contexts/UserDataContext';
import { useFirestore, useUser } from 'reactfire';
import { doc, setDoc } from 'firebase/firestore';

// Utils
import { THEME_COOKIE_NAME } from '@/util/config';


// Local-caching & cloud-backed algorithm borrowed from
// https://github.com/SVWEFSBRWHWBCOTSEID/game-website/blob/main/components/PreferencesProvider.tsx
export default function UserDataProvider(props: { children: ReactNode }) {
    const [data, setData] = useState(defaultUserData);

    const firestore = useFirestore();
    const { data: user } = useUser();

    // Load saved preferences from `localStorage` on mount
    useLayoutEffect(() => {
        const raw = localStorage.getItem('data');
        if (!raw) return localStorage.setItem('data', JSON.stringify(data));

        // `deepmerge` localStorage data with default object to update it with new keys if outdated.
        const merged = deepmerge(defaultUserData, JSON.parse(raw));
        localStorage.setItem('data', JSON.stringify(merged));
        setData(merged);
    }, []);

    // Update theme on mount and data change
    useLayoutEffect(() => {
        document.cookie = `${THEME_COOKIE_NAME}=${data.options.theme}`;
        document.documentElement.className = data.options.theme;
    }, [data.options.theme]);

    /**
     * Update the user's Firestore data if logged in; otherwise, directly edit the `localStorage` cache instead.
     * @param newData The new user data.
     */
    function updateUserData(newData: UserData) {
        if (!user) return setLocalData(newData);
        void setDoc(doc(firestore, 'users', user.uid), newData);
    }

    /**
     * Update the `localStorage` user data cache with new data.
     * @param newData The new user data.
     */
    function setLocalData(newData: UserData) {
        localStorage.setItem('data', JSON.stringify(newData));
        setData(newData);
    }

    return (
        <UserDataContext.Provider value={{ data, setData: updateUserData, setLocalData }}>
            {props.children}
        </UserDataContext.Provider>
    )
}

// Merges two objects `a` and `b`, turning `b` into the shape of `a`.
// Concretely, this function overrides the keys of `a` with values under the same keys in `b`.
// See https://github.com/GunnWATT/watt/blob/main/client/src/hooks/useLocalStorageData.ts#L35-L52
export function deepmerge<T extends {}, V extends T>(a: T, b: V) {
    const newObj = { ...a };

    for (const key in a) if (key in b) {
        // Recursively merge non-array, non-null object keys
        // TODO: this errors when `V extends T` is removed, as it should; we should implement some type safety
        // to enforce same key types as well as key names between `a` and `b`
        const aValue = a[key], bValue = b[key];
        newObj[key] = typeof aValue === 'object' && typeof bValue === 'object' && aValue && bValue && !Array.isArray(aValue) && !Array.isArray(bValue)
            ? deepmerge(aValue, bValue)
            : bValue;
    }

    return newObj;
}
