import {Metadata} from 'next';
import PreferencesContent from '@/app/preferences/PreferencesContent';


export const metadata: Metadata = {
    title: 'Preferences'
}

export default function Preferences() {
    return (
        <main className="container py-24">
            <h1 className="text-4xl font-bold mb-3">
                Preferences
            </h1>

            <PreferencesContent />
        </main>
    )
}