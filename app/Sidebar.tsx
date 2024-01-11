import SidebarItem from '@/app/SidebarItem';


export default function Sidebar() {
    return (
        <aside className="hidden w-[12rem] flex-none pl-3 py-24 border-r border-tertiary dark:border-tertiary-dark md:flex flex-col sticky top-0 h-screen gap-1 bg-content-secondary dark:bg-content-secondary-dark">
            <SidebarItem href="/">Home</SidebarItem>
            <SidebarItem href="/classes">Classes</SidebarItem>
            <SidebarItem href="/preferences">Preferences</SidebarItem>
        </aside>
    )
}
