import type {Section} from '@/util/unitime';


export default function ScheduleClass(props: Section) {
    return (
        <div
            style={{gridRowStart: parseTime(props.start), gridRowEnd: parseTime(props.end), gridColumnStart: 2}}
            className="bg-theme text-white rounded px-4 py-3"
        >
            <section className="flex gap-2 sm:gap-4">
                <div className="flex flex-col">
                    {props.sections.map((id, i) => (
                        <h3 className="font-semibold font-lg line-clamp-1" key={id}>
                            {props.names[i]}: {props.titles[i]} ({id})
                        </h3>
                    ))}
                </div>

                <div className="flex gap-1 flex-none text-xs font-semibold">
                    <p className="hidden sm:block rounded-full bg-yellow-500 text-yellow-700 px-2 py-1 flex-none">
                        {props.type}
                    </p>
                    <p className="hidden sm:block rounded-full bg-yellow-500 text-yellow-700 px-2 py-1 flex-none">
                        {props.start}-{props.end}
                    </p>
                    <p className="rounded-full bg-yellow-500 text-yellow-700 px-2 py-1 flex-none">
                        {props.location}
                    </p>
                </div>
            </section>

            {props.instructors?.map((name, i) => (
                <p className="font-light text-sm" key={name}>
                    {name}{props.emails[i] && (
                        <> (<a href={`mailto:${props.emails[i]}`} className="font-normal hover:underline">{props.emails[i]}</a>)</>
                    )}
                </p>
            ))}
        </div>
    )
}

/**
 * Parses a UniTime time string into its corresponding number of grid row ticks (multiples of 5 minutes).
 * @param time The string to parse.
 * @returns The number of grid rows this time represents.
 */
export function parseTime(time: string) {
    if (time === 'noon') return 61;

    // Parse AM/PM time string, subtracting 84 because the grid starts at 7:00 AM and adding one for indexing.
    let [hour, minute] = time.slice(0, time.length - 1).split(':').map(s => Number(s));
    if (time.endsWith('p') && hour != 12) hour += 12;

    return (hour * 60 + minute) / 5 - 84 + 1;
}
