export default function Loading() {
    return (
        <div className="flex flex-col gap-4">
            <section className="mb-8">
                <input
                    disabled
                    type="text"
                    className="border border-tertiary dark:border-tertiary-dark rounded px-3 py-1.5 focus:outline-none focus-visible:ring-[3px] w-full mb-1 dark:bg-content-secondary-dark placeholder:text-secondary dark:placeholder:text-secondary-dark"
                    placeholder="Search organizations"
                />
                <p className="text-xs font-light text-secondary dark:text-secondary-dark">
                    Viewing ... of ... organizations.
                </p>
            </section>

            <DummyOrganization/>
            <DummyOrganization headingWidth={55} textWidth={40}/>
            <DummyOrganization headingWidth={45}/>
            <DummyOrganization textWidth={75}/>
            <DummyOrganization headingWidth={70}/>
            <DummyOrganization textWidth={25}/>
        </div>
    )
}

type DummyOrganizationProps = {
    headingWidth?: number,
    textWidth?: number,
}

function DummyOrganization(props: DummyOrganizationProps) {
    const {headingWidth = 40, textWidth = 60} = props;

    return (
        <div className="flex gap-5">
            <div className="size-[75px] bg-pulse dark:bg-pulse-dark rounded-full flex-none animate-pulse" />

            <div className="flex-grow">
                <div
                    className="rounded-full h-5 bg-pulse dark:bg-pulse-dark animate-pulse mb-1.5"
                    style={{width: `${headingWidth}%`}}
                />
                <div className="rounded-full h-4 bg-pulse dark:bg-pulse-dark animate-pulse mb-1.5" />
                <div
                    className="rounded-full h-4 bg-pulse dark:bg-pulse-dark animate-pulse"
                    style={{width: `${textWidth}%`}}
                />
            </div>
        </div>
    )
}
