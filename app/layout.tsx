import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

// Components
import Sidebar from '@/app/Sidebar';
import FirebaseProviders from '@/components/FirebaseProviders';
import UserDataProvider from '@/components/UserDataProvider';
import CurrentTimeProvider from '@/components/CurrentTimeProvider';
import ClassesProvider from '@/components/ClassesProvider';
import EventsProvider from '@/components/EventsProvider';
import FaviconHandler from '@/components/FaviconHandler';
import InstallModal from '@/components/InstallModal';

// Utils
import { loadClasses } from '@/util/unitime';

import './globals.css';


const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Pyrite';
const APP_DESC = 'A student-made schedule app for Purdue University!';
const TITLE_TEMPLATE = `%s | ${APP_NAME}`;

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        template: TITLE_TEMPLATE,
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
        title: {
            template: TITLE_TEMPLATE,
            absolute: APP_NAME
        },
        description: APP_DESC
    },
    twitter: {
        description: APP_DESC
    },
}

export const viewport: Viewport = {
    themeColor: '#131313'
}

export default async function Layout(props: { children: ReactNode }) {
    const classes = await loadClasses();

    return (
        <html lang="en" className="dark">
            <body className="bg-content dark:bg-content-dark text-primary dark:text-primary-dark" style={inter.style}>
                <FirebaseProviders>
                    <UserDataProvider>
                        <CurrentTimeProvider>
                            <ClassesProvider classes={classes}>
                                <EventsProvider>
                                    <div className="flex">
                                        <Sidebar />
                                        <main className="relative container pt-16 pb-24 sm:pt-24">
                                            {props.children}
                                        </main>

                                        <FaviconHandler />
                                        <InstallModal />
                                    </div>
                                </EventsProvider>
                            </ClassesProvider>
                        </CurrentTimeProvider>
                    </UserDataProvider>
                </FirebaseProviders>
            </body>
        </html>
    )
}
