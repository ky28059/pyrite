import type {ReactNode} from 'react';
import type {Metadata, Viewport} from 'next';
import {Inter} from 'next/font/google';

// Components
import Sidebar from '@/app/Sidebar';
import FirebaseProviders from '@/components/FirebaseProviders';
import UserDataProvider from '@/components/UserDataProvider';
import CurrentTimeProvider from '@/components/CurrentTimeProvider';

import './globals.css';


const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Purdue App';
const APP_DESC = 'A student-made schedule app for Purdue University!';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        template: '%s | Purdue App',
        absolute: APP_NAME
    },
    description: APP_DESC,
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        title: APP_NAME
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        description: APP_DESC
    },
    twitter: {
        description: APP_DESC
    },
}

export const viewport: Viewport = {
    themeColor: '#131313'
}

export default function Layout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-content dark:bg-content-dark text-primary dark:text-primary-dark" style={inter.style}>
            <FirebaseProviders>
                <UserDataProvider>
                    <CurrentTimeProvider>
                        <div className="flex">
                            <Sidebar />
                            <main className="container pt-16 pb-24 sm:pt-24">
                                {props.children}
                            </main>
                        </div>
                    </CurrentTimeProvider>
                </UserDataProvider>
            </FirebaseProviders>
            </body>
        </html>
    )
}
