'use client'

import type {Section} from '@/util/unitime';
import {useNextPeriod} from '@/hooks/useNextPeriod';


type ClassIndicatorProps = {
    classes: Section[]
}
export default function ClassIndicator(props: ClassIndicatorProps) {
    const {next, span, length, toStart, toEnd} = useNextPeriod(props.classes);
    if (!next) return null;

    // If we're past the start of the next period, display "in progress" text.
    // Display minutes when > 1 minute remaining, seconds in the last minute.
    if (toStart <= 0) {
        const endQuantity = toEnd < 1
            ? Math.ceil(toEnd * 60)
            : Math.ceil(toEnd);
        const endUnit = `${toEnd < 1 ? 'second' : 'minute'}${endQuantity !== 1 ? 's' : ''}`;

        const startQuantity = -toStart < 1
            ? Math.ceil(-toStart * 60)
            : Math.ceil(-toStart);
        const startUnit = `${-toStart < 1 ? 'second' : 'minute'}${startQuantity !== 1 ? 's' : ''}`;

        return (
            <div className="mb-8">
                <p className="mb-1">
                    <strong>{next.names[0]}</strong>{' '}
                    ending in {endQuantity} {endUnit}, started {startQuantity} {startUnit} ago.
                </p>
                <ProgressBar value={toEnd / length * 100} />
            </div>
        )
    }

    // Display minutes when > 1 minute remaining, seconds in the last minute.
    const quantity = toStart < 1
        ? Math.ceil(toStart * 60)
        : Math.ceil(toStart);
    const unit = `${toStart < 1 ? 'second' : 'minute'}${quantity !== 1 ? 's' : ''}`;

    return (
        <div className="mb-8">
            <p className="mb-1">
                <strong>{next.names[0]}</strong>{' '}
                starting in {quantity} {unit}.
            </p>
            <ProgressBar value={(span - toStart) / span * 100} />
        </div>
    );
}

function ProgressBar(props: {value: number}) {
    return (
        <div className="flex overflow-hidden bg-tertiary dark:bg-tertiary-dark h-2 rounded">
            <div
                className="bg-black dark:bg-white transition-[width] duration-700"
                style={{width: `${props.value}%`}}
            />
        </div>
    )
}
