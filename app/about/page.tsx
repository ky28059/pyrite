import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'About',
    openGraph: {
        title: 'About'
    }
}

export default function About() {
    return (
        <main className="relative container pt-16 pb-24 sm:pt-24">
            <h1 className="text-4xl font-bold mb-6">
                About
            </h1>

            <p className="mb-5">
                Pyrite is an app for managing class schedules, joining clubs, finding events, and hopefully a whole lot
                more made by freshman in CS <a href="https://github.com/ky28059" target="_blank" rel="noopener noreferrer" className="text-theme hover:underline">Kevin Yu</a>{' '}
                (that's me!).
            </p>

            <p className="mb-5">
                Pyrite is open-sourced on <a href="https://github.com/ky28059/pyrite" target="_blank" rel="noopener noreferrer" className="text-theme hover:underline">GitHub</a>.
                The frontend is built using Next.js, TypeScript, and TailwindCSS, interfaces with a Firebase database for
                cloud persistence, and is hosted on Vercel. Contribute by <a href="https://github.com/ky28059/pyrite/issues/new" target="_blank" rel="noopener noreferrer" className="text-theme hover:underline">creating an issue</a>{' '}
                or <a href="https://github.com/ky28059/pyrite/pulls" target="_blank" rel="noopener noreferrer" className="text-theme hover:underline">opening a pull request</a>;
                all feedback is welcome!
            </p>

            <p>
                Pyrite was heavily inspired by the schedule app I made in high school, <a href="https://github.com/GunnWATT/watt" target="_blank" rel="noopener noreferrer" className="text-theme hover:underline">WATT</a>,
                as well as my project for the 2023 Hello World Hackathon, <a href="https://github.com/ky28059/rally" target="_blank" rel="noopener noreferrer" className="text-theme hover:underline">rally</a>.
                Thanks also to <a href="https://github.com/elnardu" target="_blank" rel="noopener noreferrer" className="text-theme over:underline">elnardu</a>{' '}
                for showing me the UniTime exports API.
            </p>
        </main>
    )
}
