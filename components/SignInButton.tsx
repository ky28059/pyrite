'use client'

import {useContext} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth, useFirestore} from 'reactfire';

// Utils
import {signInWithPopup, OAuthProvider} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import UserDataContext from '@/contexts/UserDataContext';
import {MdLogin} from 'react-icons/md';


export default function SignInButton() {
    const auth = useAuth();
    const firestore = useFirestore();

    const params = useSearchParams();
    const {push} = useRouter();

    const {data} = useContext(UserDataContext);

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
            if (params.get('redirectTo')) push(params.get('redirectTo')!);
        } catch (error) {
            console.error('Error during Microsoft sign-in:', error);
        }
    }

    return (
        <button
            className="flex gap-2 text-lg sm:text-base items-center w-full px-4 sm:pr-0 py-2 rounded sm:rounded-r-none hover:bg-theme/30 dark:hover:bg-theme-dark/30 font-semibold text-secondary dark:text-secondary-dark hover:!text-inherit transition duration-200 text-left"
            onClick={signInWithMicrosoft}
        >
            <MdLogin className="flex-none" />
            <span className="hidden sm:block">Sign In</span>
        </button>
    )
}
