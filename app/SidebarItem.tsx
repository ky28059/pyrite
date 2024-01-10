'use client'

import type {ReactNode} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';


type SidebarItemProps = {
    href: string,
    children: ReactNode
}
export default function SidebarItem(props: SidebarItemProps) {
    const pathname = usePathname();
    const active = pathname === props.href;

    return (
        <Link
            href={props.href}
            className={'rounded-l transition duration-200 pl-5 pr-12 py-2 ' + (active ? 'font-semibold bg-theme text-white' : 'hover:bg-theme/30')}
        >
            {props.children}
        </Link>
    )
}
