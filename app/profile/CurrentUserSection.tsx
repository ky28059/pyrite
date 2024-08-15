'use client'

import { useContext } from 'react';
import { useAuth, useFirestore, useUser } from 'reactfire';
import { signInWithPopup, OAuthProvider, Auth, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Components
import OutlineButton, { DangerOutlineButton } from '@/components/OutlineButton';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';


export default function CurrentUserSection() {
    const auth = useAuth();
    const firestore = useFirestore();

    const { data } = useContext(UserDataContext);
    const { data: user } = useUser();

    async function signInWithMicrosoft() {
        // Initialize Microsoft OAuth provider, setting the tenant ID to restrict login to `purdue.edu` only.
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            tenant: '4130bd39-7c53-419c-b1e5-8758d6d63f21'
        });

        try {
            const result = await signInWithPopup(auth, provider);

            // Query the reference to the user's document; if it doesn't exist, create it.
            const reference = doc(firestore, 'users', result.user.uid);
            const document = await getDoc(reference);
            if (!document.exists()) await setDoc(reference, data);

            console.log('User info:', result.user);
            // if (params.get('redirectTo')) push(params.get('redirectTo')!);
        } catch (error) {
            console.error('Error during Microsoft sign-in:', error);
        }
    }

    return !user ? (
        <section className="flex mb-12 gap-4 sm:gap-8">
            <div className="flex-none size-20 sm:size-24 rounded-full bg-gray-200 dark:bg-content-secondary flex items-center justify-center text-3xl text-secondary font-semibold">
                K
            </div>

            <div>
                <p className="text-xl mb-1">
                    You are not signed in.
                </p>
                <p className="text-secondary mb-3">
                    Sign in to sync your schedule and preferences across devices.
                </p>

                <OutlineButton onClick={signInWithMicrosoft}>
                    Sign in with Microsoft
                </OutlineButton>
            </div>
        </section>
    ) : (
        <section className="flex mb-12 gap-4 sm:gap-8">
            <div className="flex-none size-20 sm:size-24 rounded-full bg-gray-200 dark:bg-content-secondary flex items-center justify-center text-3xl text-secondary font-semibold">
                {user.displayName?.[0].toUpperCase()}
            </div>

            <div>
                <p className="font-medium text-secondary">
                    Signed in as:
                </p>
                <p className="text-xl mb-4">
                    {user.displayName} ({user.email})
                </p>

                <DangerOutlineButton onClick={() => signOutAndClearCache(auth)}>
                    Sign out
                </DangerOutlineButton>
            </div>
        </section>
    )
}

function signOutAndClearCache(auth: Auth) {
    void signOut(auth);

    // Clear firebase cache to prevent re-signing-in as the same user from crashing the app immediately
    // due to "missing permission" errors in `FirebaseUserDataUpdater`.
    // See https://github.com/FirebaseExtended/reactfire/issues/485
    // and https://github.com/FirebaseExtended/reactfire/discussions/228#discussioncomment-182830.
    // @ts-ignore
    const map = globalThis['_reactFirePreloadedObservables'];
    Array.from(map.keys()).forEach(
        // @ts-ignore
        (key) => key.includes('firestore') && map.delete(key),
    );
}
