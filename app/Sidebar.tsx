import Link from 'next/link';


export default function Sidebar() {
    return (
        <aside className="px-12 py-24 border-r flex flex-col sticky top-0 h-screen">
            <Link href="/">Home</Link>
            <Link href="/classes">Classes</Link>
        </aside>
    )
}
