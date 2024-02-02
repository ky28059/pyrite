export default function Loading() {
    return (
        <div className="flex flex-col gap-4">
            <DummyOrganization />
            <DummyOrganization />
            <DummyOrganization />
            <DummyOrganization />
            <DummyOrganization />
            <DummyOrganization />
        </div>
    )
}

function DummyOrganization() {
    return (
        <div className="flex gap-5">
            <div className="size-[75px] bg-content-secondary dark:bg-content-secondary-dark rounded-full flex-none animate-pulse" />

            <div className="flex-grow">
                <div className="rounded-full h-6 w-[40%] bg-content-secondary dark:bg-content-secondary-dark animate-pulse mb-1" />
                <div className="rounded-full h-5 bg-content-secondary dark:bg-content-secondary-dark animate-pulse mb-1" />
                <div className="rounded-full h-5 w-[60%] bg-content-secondary dark:bg-content-secondary-dark animate-pulse mb-1" />
            </div>
        </div>
    )
}
