import type {ReactNode} from 'react';
import {Inter} from 'next/font/google';

// Components
import Sidebar from '@/app/Sidebar';
import UserDataProvider from '@/components/UserDataProvider';

import './globals.css';


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
                <UserDataProvider>
                    <Sidebar />
                    {props.children}
                </UserDataProvider>
            </main>
            </body>
        </html>
    )
}
