import type {Section} from '@/util/unitime';


export default function Class(props: Section) {
    return (
        <div className="px-6 py-3 rounded border">
            <section className="flex gap-2">
                <div className="flex flex-col">
                    {props.sections.map((id, i) => (
                        <h3 className="font-medium font-lg" key={id}>
                            {props.names[i]}: {props.titles[i]} ({id})
                        </h3>
                    ))}
                </div>

                <div className="bg-zinc-800 text-white text-xs px-2 pt-0.5 pb-1 mt-1 h-max rounded-full font-semibold">
                    {props.type}
                </div>
            </section>

            <p className="font-light text-sm mb-1">
                {props.dayOfWeek} {props.start}-{props.end} @ {props.location}
            </p>

            {props.instructors?.map((name, i) => (
                <p className="font-light text-sm" key={name}>
                    {name}{props.emails[i] && (
                        <> (<a href={`mailto:${props.emails[i]}`} className="text-blue-500 font-normal hover:underline">{props.emails[i]}</a>)</>
                    )}
                </p>
            ))}
        </div>
    )
}
