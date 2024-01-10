'use client'

import {ReactNode, useEffect, useState} from 'react';
import {defaultUserData, UserDataContext} from '@/contexts/UserDataContext';


// Local-caching & cloud-backed algorithm borrowed from
// https://github.com/GunnWATT/watt/blob/main/client/src/hooks/useLocalStorageData.ts
export default function UserDataProvider(props: {children: ReactNode}) {
    const userDataRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('data') : '';
    const [data, setData] = useState(tryParseLocalStorageData());

    useEffect(() => {
        const parsed = tryParseLocalStorageData();
        setData(parsed);
        localStorage.setItem('data', JSON.stringify(parsed));
    }, [userDataRaw]);

    function tryParseLocalStorageData() {
        if (!userDataRaw) return defaultUserData;

        try {
            const localStorageData = JSON.parse(localStorage.getItem('data')!);
            return deepmerge(defaultUserData, localStorageData);
        } catch {
            return defaultUserData;
        }
    }

    return (
        <UserDataContext.Provider value={data}>
            {props.children}
        </UserDataContext.Provider>
    )
}

// Merges two objects `a` and `b`, turning `b` into the shape of `a`.
// Concretely, this function overrides the keys of `a` with values under the same keys in `b`.
// See https://github.com/GunnWATT/watt/blob/main/client/src/hooks/useLocalStorageData.ts#L38-L52
function deepmerge<T extends {}, V extends T>(a: T, b: V) {
    const newObj = {...a};

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
