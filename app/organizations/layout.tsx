import type {ReactNode} from 'react';


export default function Layout(props: {children: ReactNode}) {
    return (
        <>
            <h1 className="text-4xl font-bold mb-3">
                Organizations
            </h1>

            {props.children}
        </>
    )
}
