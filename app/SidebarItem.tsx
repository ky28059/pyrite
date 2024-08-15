'use client'

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { IconType } from 'react-icons';


type SidebarItemProps = {
    href: string,
    icon: IconType,
    children?: ReactNode,

    desktopOnly?: boolean,
    mobileOnly?: boolean
}
export default function SidebarItem(props: SidebarItemProps) {
    const pathname = usePathname();
    const active = pathname === props.href;

    const Icon = props.icon;

    return (
        <Link
            href={props.href}
            className={'gap-3 text-lg sm:text-base items-center text-secondary rounded sm:rounded-r-none transition duration-200 px-4 sm:pr-12 py-2 ' + (active ? 'font-semibold bg-theme !text-white' : 'hover:bg-theme/30 dark:hover:text-white') + (props.desktopOnly ? ' hidden sm:flex' : props.mobileOnly ? ' flex sm:hidden' : ' flex')}
        >
            <Icon className="flex-none pb-0.5" />
            <p className="hidden sm:block">{props.children}</p>
        </Link>
    )
}
