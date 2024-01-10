import type {ReactNode} from 'react';
import {Inter} from 'next/font/google';

import './globals.css';
import Sidebar from '@/app/Sidebar';

const inter = Inter({ subsets: ['latin'] });


export const metadata = {
    title: {
        template: '%s | Purdue App',
        absolute: 'Purdue App'
    },
    description: 'A student-made schedule app for Purdue University!',
}

export default function Layout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <main className="flex">
                <Sidebar />
                {props.children}
            </main>
            </body>
        </html>
    )
}
