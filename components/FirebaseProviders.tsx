'use client'

import type { ReactNode } from 'react';
import {
    useFirebaseApp,
    AuthProvider,
    FirestoreProvider,
    AnalyticsProvider,
    FirebaseAppProvider,
    StorageProvider
} from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth, OAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyBhQSjDgI2DsC8hnvIg49MBBIKdOvOd0GQ",
    authDomain: "purdue-app-63069.firebaseapp.com",
    projectId: "purdue-app-63069",
    storageBucket: "purdue-app-63069.appspot.com",
    messagingSenderId: "600432243003",
    appId: "1:600432243003:web:9c7b8d08c2b235a692471e",
    measurementId: "G-1YQPZGG4PF"
};

export default function FirebaseProviders(props: { children: ReactNode }) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <InnerFirebaseProviders>
                {props.children}
            </InnerFirebaseProviders>
        </FirebaseAppProvider>
    );
}

function InnerFirebaseProviders(props: { children: ReactNode }) {
    const firebase = useFirebaseApp();

    // Initialize auth and functions
    const auth = getAuth(firebase);
    const storage = getStorage(firebase);
    // const analytics = getAnalytics(firebase);
    const firestore = getFirestore(firebase);

    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestore}>
                <StorageProvider sdk={storage}>
                    {props.children}
                </StorageProvider>

                {/* <AnalyticsProvider sdk={analytics}> */}
                {/* </AnalyticsProvider> */}
            </FirestoreProvider>
        </AuthProvider>
    )
}
