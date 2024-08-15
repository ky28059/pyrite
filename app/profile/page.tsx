import { Metadata } from 'next';
import PreferencesSection from '@/app/profile/PreferencesSection';
import CurrentUserSection from '@/app/profile/CurrentUserSection';


export const metadata: Metadata = {
    title: 'Profile',
    openGraph: {
        title: 'Profile'
    }
}

export default function Profile() {
    return (
        <main className="relative container pt-16 pb-24 sm:pt-24">
            <h1 className="text-4xl font-bold mb-6">
                Profile
            </h1>

            <CurrentUserSection />

            <h2 className="font-semibold text-xl mb-4">
                Preferences
            </h2>
            <PreferencesSection />
        </main>
    )
}
