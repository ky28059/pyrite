'use client'

import { useNextPeriod } from '@/hooks/useNextPeriod';
import type { Section } from '@/util/unitime';


type NextClassProgressBarProps = {
    classes: { [p: string]: Section }
}
export default function NextClassProgressBar(props: NextClassProgressBarProps) {
    const { next, span, length, toStart, toEnd } = useNextPeriod(props.classes);
    if (!next) return null;

    // If the time to the next period is greater than `span`, we're the first period of the day and before
    // the time we should display the progress bar.
    if (toStart > span) return null;

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
            <div className="mb-8 px-5 sm:px-14 xl:pr-0">
                <p className="mb-1">
                    <strong>{next.name}</strong>{' '}
                    ending in {endQuantity} {endUnit}, started {startQuantity} {startUnit} ago.
                </p>
                <ProgressBar value={(length - toEnd) / length * 100} />
            </div>
        )
    }

    // Display minutes when > 1 minute remaining, seconds in the last minute.
    const quantity = toStart < 1
        ? Math.ceil(toStart * 60)
        : Math.ceil(toStart);
    const unit = `${toStart < 1 ? 'second' : 'minute'}${quantity !== 1 ? 's' : ''}`;

    return (
        <div className="mb-8 px-5 sm:px-14 xl:pr-0">
            <p className="mb-1">
                <strong>{next.name}</strong>{' '}
                starting in {quantity} {unit} at <strong>{next.location}</strong>.
            </p>
            <ProgressBar value={(span - toStart) / span * 100} />
        </div>
    );
}

function ProgressBar(props: { value: number }) {
    return (
        <div className="flex overflow-hidden bg-tertiary h-2 rounded">
            <div
                className="bg-primary transition-[width] duration-700"
                style={{ width: `${props.value}%` }}
            />
        </div>
    )
}
