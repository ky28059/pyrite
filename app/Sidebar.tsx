'use client'

import {useAuth, useUser} from 'reactfire';
import {signOut} from 'firebase/auth';

// Components
import SidebarItem from '@/app/SidebarItem';
import SignInButton from '@/components/SignInButton';
import FirebaseUserDataUpdater from '@/components/FirebaseUserDataUpdater';

// Icons
import {FaBookmark, FaCalendar, FaGear} from 'react-icons/fa6';


export default function Sidebar() {
    const auth = useAuth();
    const {data: user, status} = useUser();

    return (
        <aside className="hidden w-[12rem] flex-none pl-3 pt-24 pb-12 border-r border-tertiary dark:border-tertiary-dark md:flex flex-col sticky top-0 h-screen gap-1 bg-content-secondary dark:bg-content-secondary-dark">
            <SidebarItem href="/" icon={FaCalendar}>
                Home
            </SidebarItem>
            <SidebarItem href="/classes" icon={FaBookmark}>
                Classes
            </SidebarItem>
            <SidebarItem href="/preferences" icon={FaGear}>
                Preferences
            </SidebarItem>

            <div className="mt-auto">
                {status === 'loading' ? (
                    <div>...</div>
                ) : !user ? (
                    <SignInButton />
                ) : (
                    <button
                        className="w-full px-2 py-1 -ml-1 mr-2 rounded flex gap-2 items-center font-semibold text-secondary dark:text-secondary-dark hover:bg-theme/30 transition duration-200"
                        onClick={() => signOut(auth)}
                    >
                        <FirebaseUserDataUpdater />

                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-content-dark flex items-center justify-center text-lg">
                            {user.displayName?.[0].toUpperCase()}
                        </div>

                        {user.displayName}
                    </button>
                )}
            </div>
        </aside>
    )
}
