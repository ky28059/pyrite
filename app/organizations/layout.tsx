import type { ReactNode } from 'react';


export default function Layout(props: { children: ReactNode }) {
    return (
        <main className="relative container pt-16 pb-24 sm:pt-24">
            <h1 className="text-4xl font-bold mb-3">
                Organizations
            </h1>

            {props.children}
        </main>
    )
}
