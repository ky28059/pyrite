'use client'

import {Disclosure} from '@headlessui/react';
import {FaChevronDown, FaCircleCheck, FaCircleXmark} from 'react-icons/fa6';
import type {Allergen, DiningCourt, Meal} from '@/util/menus';


type DiningCourtMealProps = {
    location: DiningCourt,
    meal?: Meal
}
export default function DiningCourtMeal(props: DiningCourtMealProps) {
    return props.meal?.Status === 'Open' ? (
        <Disclosure>
            <Disclosure.Button className="flex gap-3 items-center rounded border border-tertiary dark:border-tertiary-dark hover:border-secondary dark:hover:border-secondary-dark px-4 py-2 transition duration-150">
                {({open}) => (
                    <>
                        <FaCircleCheck className="text-lime-500" />
                        {props.location}

                        <FaChevronDown className={`bg-content-secondary dark:bg-content-secondary-dark rounded-full p-1 transition duration-100` + (open ? ' rotate-180' : '')}/>
                    </>
                )}
            </Disclosure.Button>

            <Disclosure.Panel className="text-sm">
                {props.meal.Stations.map((s) => (
                    <section
                        className="rounded overflow-clip border border-tertiary dark:border-tertiary-dark divide-y divide-tertiary dark:divide-tertiary-dark mb-2"
                        key={s.Name + props.meal?.ID}
                    >
                        <h5 className="font-medium px-2 py-1 bg-content-secondary dark:bg-content-secondary-dark">
                            {s.Name}
                        </h5>
                        {s.Items.map((i) => (
                            <div
                                className="px-2 py-0.5 text-secondary dark:text-secondary-dark flex flex-wrap items-center"
                                key={i.ID + props.meal?.ID}
                            >
                                <span className="mr-1.5">{i.Name}</span>
                                {i.Allergens?.filter((a) => a.Value).map((a) => (
                                    <img
                                        src={allergenIconUrl(a)}
                                        key={i.ID + props.meal?.ID + a.Name}
                                        className="size-4"
                                        alt={a.Name}
                                    />
                                ))}
                            </div>
                        ))}
                    </section>
                ))}
            </Disclosure.Panel>
        </Disclosure>
    ) : (
        <div className="flex gap-3 items-center rounded border border-tertiary dark:border-tertiary-dark px-4 py-2">
            <FaCircleXmark className="text-red-500" />
            {props.location}
        </div>
    )
}

function allergenIconUrl(a: Allergen) {
    // Un-pluralize names (eg. soy -> soy, peanuts -> peanut)
    const name = a.Name.endsWith('s')
        ? a.Name.slice(0, a.Name.length - 1)
        : a.Name;
    return `https://api.hfs.purdue.edu/Menus/Content/dietaryTagIcons/PurdueMenusIconsNoBackground_${name.replaceAll(' ', '')}.svg`;
}
