'use client'

import {DateTime} from 'luxon';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';


type HomeDatePickerProps = {
    viewDate: DateTime,
    setViewDate: (d: DateTime) => void
}
export default function HomeDatePicker(props: HomeDatePickerProps) {
    const {viewDate, setViewDate} = props;

    function decDay() {
        setViewDate(viewDate.minus({day: 1}));
    }

    function incDay() {
        setViewDate(viewDate.plus({day: 1}));
    }

    return (
        <div className="flex gap-2 justify-center mb-10">
            <button className="text-secondary dark:text-secondary-dark p-2" onClick={decDay}>
                <FaChevronLeft />
            </button>

            <button className="w-64">
                {props.viewDate.toLocaleString(DateTime.DATE_HUGE)}
            </button>

            <button className="text-secondary dark:text-secondary-dark p-2" onClick={incDay}>
                <FaChevronRight />
            </button>
        </div>
    )
}
