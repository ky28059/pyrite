import type {Section} from '@/util/unitime';


export default function ScheduleClass(props: Section) {
    return (
        <div
            style={{gridRowStart: parseTime(props.start), gridRowEnd: parseTime(props.end), gridColumnStart: 2}}
            className="bg-theme text-white rounded px-4 py-2"
        >
            <section className="flex gap-2">
                <div className="flex flex-col">
                    {props.sections.map((id, i) => (
                        <h3 className="font-semibold font-lg" key={id}>
                            {props.names[i]}: {props.titles[i]} ({id})
                        </h3>
                    ))}
                </div>

                {/*<div className="bg-zinc-800 dark:bg-content-secondary-dark text-white text-xs px-2 py-0.5 mt-0.5 h-max rounded-full font-semibold">*/}
                {/*    {props.type}*/}
                {/*</div>*/}
            </section>

            <p className="font-light text-sm">
                {props.start}-{props.end}
            </p>

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
