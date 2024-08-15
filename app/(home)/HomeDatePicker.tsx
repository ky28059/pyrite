'use client'

import { DateTime } from 'luxon';
import { useHotkeys } from 'react-hotkeys-hook';

// Components
import DatePicker from '@/app/(home)/DatePicker';

// Icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


type HomeDatePickerProps = {
    viewDate: DateTime,
    setViewDate: (d: DateTime) => void
}
export default function HomeDatePicker(props: HomeDatePickerProps) {
    const { viewDate, setViewDate } = props;

    function decDay() {
        setViewDate(viewDate.minus({ day: 1 }));
    }

    function incDay() {
        setViewDate(viewDate.plus({ day: 1 }));
    }

    useHotkeys('left', decDay, [viewDate]);
    useHotkeys('right', incDay, [viewDate]);

    return (
        <div className="flex gap-2 justify-center mb-10">
            <button className="text-secondary p-2" onClick={decDay}>
                <FaChevronLeft />
            </button>

            <DatePicker viewDate={viewDate} setViewDate={setViewDate} />

            <button className="text-secondary p-2" onClick={incDay}>
                <FaChevronRight />
            </button>
        </div>
    )
}
