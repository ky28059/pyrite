'use client'

import {useContext, useMemo, useState} from 'react';
import {DateTime} from 'luxon';
import UserDataContext from '@/contexts/UserDataContext';

// Components
import DiningCourtMeal from '@/app/(home)/DiningCourtMeal';
import CenteredModal from '@/components/CenteredModal';
import CloseButton from '@/components/CloseButton';

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

    // Find which favorites are being served in this meal
    const {data} = useContext(UserDataContext);
    const favoriteCounts = useMemo(() => {
        return props.meals?.map((l) => ({
            name: l.Location,
            favorites: l.Meals.find(m => m.Name === props.meal)?.Stations
                .flatMap(s => s.Items)
                .filter(i => data.favoriteFoodIds.includes(i.ID))
        })).filter(d => d.favorites && d.favorites.length > 0)
    }, [props.meals, data.favoriteFoodIds]);

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

                    <CloseButton
                        className="ml-auto"
                        onClick={() => setOpen(false)}
                    />
                </h1>

                <section className="flex flex-col gap-2">
                    {!props.meals ? (
                        <>
                            <div className="bg-content-secondary dark:bg-content-secondary-dark rounded h-10 animate-pulse" />
                            <div className="bg-content-secondary dark:bg-content-secondary-dark rounded h-10 animate-pulse" />
                            <div className="bg-content-secondary dark:bg-content-secondary-dark rounded h-10 animate-pulse" />
                            <div className="bg-content-secondary dark:bg-content-secondary-dark rounded h-10 animate-pulse" />
                            <div className="bg-content-secondary dark:bg-content-secondary-dark rounded h-10 animate-pulse" />
                        </>
                    ) : props.meals.map((l) => (
                        <DiningCourtMeal
                            location={l.Location}
                            meal={l.Meals.find(m => m.Name === props.meal)}
                            key={l.Location + l.Date}
                        />
                    ))}

                    {favoriteCounts && favoriteCounts.length > 0 ? (
                        <section className="flex flex-col gap-0.5 mt-1">
                            {favoriteCounts?.map(({name, favorites}) => (
                                <p className="text-xs text-secondart dark:text-secondary-dark flex gap-1">
                                    <strong>{name}</strong> is serving
                                    {favorites?.map(i => <span className="text-theme dark:text-theme-dark">{i.Name}</span>)}
                                </p>
                            ))}
                        </section>
                    ) : (
                        <p className="text-xs text-secondart dark:text-secondary-dark mt-1">
                            No favorites are being served this meal.
                        </p>
                    )}
                </section>
            </CenteredModal>
        </>
    )
}
