import {Metadata} from 'next';
import PreferencesContent from '@/app/preferences/PreferencesContent';


export const metadata: Metadata = {
    title: 'Preferences',
    openGraph: {
        title: 'Preferences'
    }
}

export default function Preferences() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-3">
                Preferences
            </h1>

            <PreferencesContent />
        </>
    )
}
