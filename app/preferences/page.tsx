import { Metadata } from 'next';
import PreferencesContent from '@/app/preferences/PreferencesContent';


export const metadata: Metadata = {
    title: 'Preferences',
    openGraph: {
        title: 'Preferences'
    }
}

export default function Preferences() {
    return (
        <main className="relative container pt-16 pb-24 sm:pt-24">
            <h1 className="text-4xl font-bold mb-3">
                Preferences
            </h1>

            <PreferencesContent />
        </main>
    )
}
