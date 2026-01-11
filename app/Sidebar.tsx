'use client'

import Link from 'next/link';
import { useUser } from 'reactfire';
import { useIsMounted } from '@/hooks/useIsMounted';

// Components
import SidebarItem from '@/app/SidebarItem';
import FirebaseUserDataUpdater from '@/components/FirebaseUserDataUpdater';

// Icons
import { FaBookmark, FaCalendar, FaCircleInfo, FaMap, FaUser } from 'react-icons/fa6';
import { BsPeopleFill } from 'react-icons/bs';


export default function Sidebar() {
    const { data: user, status } = useUser();

    const mounted = useIsMounted();

    return (
        <aside className="fixed bottom-0 w-screen sm:w-[12rem] flex-none px-4 sm:pl-3 sm:pr-0 pt-2 pb-4 sm:pt-24 sm:pb-12 border-r border-tertiary flex gap-4 sm:gap-1 justify-center sm:justify-start sm:flex-col sm:sticky sm:top-0 sm:h-screen z-30 bg-content-secondary">
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

            <SidebarItem href="/map" icon={FaMap}>
                Map
            </SidebarItem>
            <SidebarItem href="/about" icon={FaCircleInfo} desktopOnly>
                About
            </SidebarItem>

            <Link
                className="mt-auto sm:w-full px-[5px] sm:px-2 py-1 sm:-ml-1 sm:mr-2 rounded flex gap-2 items-center font-semibold text-secondary hover:text-primary hover:bg-theme/30 transition duration-200"
                href="/profile"
            >
                {!mounted || status === 'loading' ? (
                    <>
                        <div className="size-10 rounded-full bg-pulse animate-pulse" />
                        <span className="hidden sm:block h-6 flex-grow mr-3 rounded bg-pulse animate-pulse" />
                    </>
                ) : !user ? (
                    <>
                        <FaUser className="size-10 rounded-full bg-gray-200 dark:bg-content p-3 flex-none" />
                        <span className="hidden sm:block">
                            Profile
                        </span>
                    </>
                ) : (
                    <>
                        <FirebaseUserDataUpdater />

                        <div className="size-10 rounded-full bg-gray-200 dark:bg-content flex items-center justify-center text-lg text-secondary">
                            {user.displayName?.[0].toUpperCase()}
                        </div>

                        <span className="hidden sm:block">
                            {user.displayName}
                        </span>
                    </>
                )}
            </Link>
        </aside>
    )
}
