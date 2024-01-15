'use client'

import {useEffect, useContext, useLayoutEffect} from 'react';
import {deepmerge} from '@/components/UserDataProvider';

// Firestore
import {useAuth, useFirestore, useFirestoreDoc} from 'reactfire';
import {doc, setDoc} from 'firebase/firestore';

// Utils
import UserDataContext, {defaultUserData} from '@/contexts/UserDataContext';


// Conditionally-rendered component updater scheme borrowed from
// https://github.com/GunnWATT/watt/blob/main/client/src/components/firebase/FirebaseUserDataUpdater.tsx
// and https://github.com/SVWEFSBRWHWBCOTSEID/game-website/blob/main/components/UserEventHandler.tsx
export default function FirebaseUserDataUpdater() {
    const {data, setLocalData} = useContext(UserDataContext);

    const auth = useAuth();
    const firestore = useFirestore();
    const { status, data: firebaseDoc } = useFirestoreDoc(doc(firestore, 'users', auth.currentUser!.uid));

    // Update localStorage to be up to date with firestore changes
    // TODO: currently, this always replaces localStorage with firebase data; we may want to support merges
    useLayoutEffect(() => {
        if (status !== 'success') return;

        // If the user doesn't have a firestore doc, create one for them
        if (!firebaseDoc.exists()) {
            console.error('[ERR] Firebase data nonexistent, cancelling merge');
            return void setDoc(doc(firestore, 'users', auth.currentUser!.uid), data);
        }

        const firebaseData = firebaseDoc.data();
        const merged = deepmerge(defaultUserData, firebaseData as any);

        // const changes = deepdifferences(merged, firebaseData);
        //
        // // Only update firestore if changes exist
        // if (Object.entries(changes).length)
        //     bulkUpdateFirebaseUserData(changes, auth, firestore);

        // TODO: update firestore doc on merge diffs

        setLocalData(merged);
    }, [status, firebaseDoc]);

    return null;
}
