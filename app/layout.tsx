import type {ReactNode} from 'react';
import {Inter} from 'next/font/google';

// Components
import Sidebar from '@/app/Sidebar';
import UserDataProvider from '@/components/UserDataProvider';
import CurrentTimeProvider from '@/components/CurrentTimeProvider';

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
        <html lang="en" className="dark">
            <body className="bg-content dark:bg-content-dark dark:text-white" style={inter.style}>
            <main className="flex">
                <UserDataProvider>
                    <CurrentTimeProvider>
                        <Sidebar />
                        {props.children}
                    </CurrentTimeProvider>
                </UserDataProvider>
            </main>
            </body>
        </html>
    )
}
