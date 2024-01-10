import type {Section} from '@/util/unitime';


export default function Class(props: Section) {
    return (
        <div className="px-6 py-3 rounded border">
            <section className="mb-1">
                {props.sections.map((id, i) => (
                    <h3 className="font-medium font-lg" key={id}>
                        {props.names[i]}: {props.titles[i]} ({id})
                    </h3>
                ))}
            </section>

            {props.instructors?.map((name, i) => (
                <p className="font-light text-sm" key={name}>
                    {name}{props.emails[i] && (
                        <> (<a href={`mailto:${props.emails[i]}`} className="text-blue-500 font-normal hover:underline">{props.emails[i]}</a>)</>
                    )}
                </p>
            ))}

            <p className="font-light text-sm">
                {props.dayOfWeek} {props.start}-{props.end} @ {props.location}
            </p>
        </div>
    )
}
