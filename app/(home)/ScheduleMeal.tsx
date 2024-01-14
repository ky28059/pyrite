'use client'

import {useState} from 'react';
import {DateTime} from 'luxon';

// Components
import DiningCourtMeal from '@/app/(home)/DiningCourtMeal';
import CenteredModal from '@/components/CenteredModal';

// Utils
import {parseGridRows} from '@/app/(home)/ScheduleClass';
import type {MealsResponse, MealType} from '@/util/menus';


type ScheduleBackgroundBlockProps = {
    start: string,
    end: string,
    meal: MealType,
    meals: MealsResponse[] | null,
    viewDate: DateTime
}
export default function ScheduleMeal(props: ScheduleBackgroundBlockProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                style={{gridRowStart: parseGridRows(props.start), gridRowEnd: parseGridRows(props.end), gridColumnStart: 1, gridColumnEnd: 4}}
                className="bg-content-secondary dark:bg-content-secondary-dark rounded-l flex items-center justify-center text-secondary dark:text-secondary-dark uppercase tracking-wider font-medium dark:hover:bg-[#0b0b0b] transition duration-200 focus:outline-none focus-visible:ring-[3px]"
                onClick={() => setOpen(true)}
            >
                <span className="z-10">{props.meal}</span>
            </button>

            <CenteredModal
                isOpen={open}
                setIsOpen={setOpen}
                className="relative flex flex-col bg-content dark:bg-content-dark rounded-md w-[36rem] max-h-[90%] mx-2 py-6 px-8 shadow-xl overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-tertiary dark:scrollbar-thumb:bg-tertiary-dark"
            >
                <h1 className="flex gap-2.5 items-center font-bold text-2xl mb-4">
                    {props.meal} <span className="font-normal text-lg">({props.viewDate.toLocaleString()})</span>
                </h1>

                {!props.meals ? (
                    // TODO: loading UI
                    <>...</>
                ) : (
                    <section className="flex flex-col gap-2">
                        {props.meals.map((l) => (
                            <DiningCourtMeal
                                location={l.Location}
                                meal={l.Meals.find(m => m.Name === props.meal)}
                                key={l.Location + l.Date}
                            />
                        ))}
                    </section>
                )}
            </CenteredModal>
        </>
    )
}
