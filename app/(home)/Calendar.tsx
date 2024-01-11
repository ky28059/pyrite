import ScheduleClass from '@/app/(home)/ScheduleClass';
import type {Section} from '@/util/unitime';
import ScheduleBackgroundBlock from '@/app/(home)/ScheduleBackgroundBlock';


export default function Calendar(props: {classes: Section[]}) {
    return (
        <div className="relative grid grid-rows-[repeat(144,_0.5rem)] grid-cols-[3.75rem_1fr_0.5rem] sm:grid-cols-[4.75rem_1fr_2rem]">
            {/* Hour labels */}
            {Array(12).fill(0).map((_, i) => (
                <p
                    style={{gridRowStart: i * 12 + 1, gridColumnStart: 1}}
                    className="text-sm text-secondary dark:text-secondary-dark -mt-2 text-right pr-6"
                    key={i}
                >
                    {i + 7}:00
                </p>
            ))}

            <ScheduleBackgroundBlock start="7:00a" end="10:00a" />
            <ScheduleBackgroundBlock start="11:00a" end="2:00p" />
            <ScheduleBackgroundBlock start="5:00p" end="9:00p" />

            {/* Horizontal rules (one every two grid rows, or 10 minutes) */}
            {/* TODO: incredibly hacky */}
            <div className="-z-10 absolute inset-0 flex flex-col pl-12 sm:pl-16">
                {Array(72).fill(0).map((_, i) => (
                    <hr className="h-4 border-t border-tertiary dark:border-tertiary-dark" key={i} />
                ))}
            </div>

            {/* Classes */}
            {props.classes.map(c => (
                <ScheduleClass {...c} key={c.sections[0]} />
            ))}
        </div>
    )
}
