import SidebarItem from '@/app/SidebarItem';


export default function Sidebar() {
    return (
        <aside className="pl-3 py-24 border-r border-tertiary dark:border-tertiary-dark flex flex-col sticky top-0 h-screen gap-1 bg-gray-100 dark:bg-content-secondary-dark">
            <SidebarItem href="/">Home</SidebarItem>
            <SidebarItem href="/classes">Classes</SidebarItem>
        </aside>
    )
}
