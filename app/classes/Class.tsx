import type {Section} from '@/util/unitime';


export default function Class(props: Section) {
    return (
        <div className="px-4 py-2 rounded border">
            <h3 className="font-medium font-lg">
                {props.courseNames[0]}: {props.courseTitles[0]} ({props.externalIds[0]})
            </h3>
            {props.instructors?.map(i => (
                <p className="font-light text-sm">
                    {i.firstName} {i.lastName}{i.email && ` (${i.email})`}
                </p>
            ))}
        </div>
    )
}
