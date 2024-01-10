import type {Section} from '@/util/unitime';


export default function Class(props: Section) {
    return (
        <div className="px-6 py-3 rounded border">
            <section className="mb-1">
                {props.externalIds.map((id, i) => (
                    <h3 className="font-medium font-lg" key={id}>
                        {props.courseNames[i]}: {props.courseTitles[i]} ({id})
                    </h3>
                ))}
            </section>

            {props.instructors?.map((i) => (
                <p className="font-light text-sm" key={i.formattedName}>
                    {i.firstName} {i.lastName}{i.email && (
                        <> (<a href={`mailto:${i.email}`} className="text-blue-500 font-normal hover:underline">{i.email}</a>)</>
                    )}
                </p>
            ))}
        </div>
    )
}
