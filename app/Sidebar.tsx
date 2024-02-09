'use client'

import {useAuth, useUser} from 'reactfire';
import {Auth, signOut} from 'firebase/auth';
import {useIsMounted} from '@/hooks/useIsMounted';

// Components
import SidebarItem from '@/app/SidebarItem';
import SignInButton from '@/components/SignInButton';
import FirebaseUserDataUpdater from '@/components/FirebaseUserDataUpdater';

// Icons
import {FaBookmark, FaCalendar, FaCircleInfo, FaGear} from 'react-icons/fa6';
import {BsPeopleFill} from 'react-icons/bs';


export default function Sidebar() {
    const auth = useAuth();
    const {data: user, status} = useUser();

    const mounted = useIsMounted();

    return (
        <aside className="fixed bottom-0 w-screen sm:w-[12rem] flex-none px-4 sm:pl-3 sm:pr-0 py-2 sm:pt-24 sm:pb-12 border-r border-tertiary dark:border-tertiary-dark flex gap-4 sm:gap-1 justify-center sm:justify-start sm:flex-col sm:sticky sm:top-0 sm:h-screen z-30 bg-content-secondary dark:bg-content-secondary-dark">
            <SidebarItem href="/" icon={FaCalendar} desktopOnly>
                Home
            </SidebarItem>
            <SidebarItem href="/classes" icon={FaBookmark}>
                Classes
            </SidebarItem>
            <SidebarItem href="/organizations" icon={BsPeopleFill}>
                Organizations
            </SidebarItem>

            <SidebarItem href="/" icon={FaCalendar} mobileOnly />

            <SidebarItem href="/preferences" icon={FaGear}>
                Preferences
            </SidebarItem>
            <SidebarItem href="/about" icon={FaCircleInfo} desktopOnly>
                About
            </SidebarItem>

            <div className="mt-auto">
                {!mounted || status === 'loading' ? (
                    <div className="w-full px-2 py-1 sm:-ml-1 sm:mr-2 flex gap-2 items-center">
                        <div className="size-10 rounded-full bg-pulse dark:bg-pulse-dark animate-pulse" />
                        <span className="hidden sm:block h-6 flex-grow mr-3 rounded bg-pulse dark:bg-pulse-dark animate-pulse" />
                    </div>
                ) : !user ? (
                    <SignInButton />
                ) : (
                    <button
                        className="w-full px-2 py-1 sm:-ml-1 sm:mr-2 rounded flex gap-2 items-center font-semibold text-secondary dark:text-secondary-dark hover:bg-theme/30 dark:hover:bg-theme-dark/30 transition duration-200"
                        onClick={() => signOutAndClearCache(auth)}
                    >
                        <FirebaseUserDataUpdater />

                        <div className="size-10 rounded-full bg-gray-200 dark:bg-content-dark flex items-center justify-center text-lg">
                            {user.displayName?.[0].toUpperCase()}
                        </div>

                        <span className="hidden sm:block">
                            {user.displayName}
                        </span>
                    </button>
                )}
            </div>
        </aside>
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
