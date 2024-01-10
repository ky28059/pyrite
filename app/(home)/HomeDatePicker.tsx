'use client'

import {DateTime} from 'luxon';


type HomeDatePickerProps = {
    viewDate: DateTime,
    setViewDate: (d: DateTime) => void
}
export default function HomeDatePicker(props: HomeDatePickerProps) {
    return (
        <div className="flex gap-4 justify-center mb-10">
            {props.viewDate.toLocaleString(DateTime.DATE_FULL)}
        </div>
    )
}
