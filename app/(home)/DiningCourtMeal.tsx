'use client'

import { Disclosure } from '@headlessui/react';
import { FaChevronDown, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

// Components
import DiningCourtMenuItem from '@/app/(home)/DiningCourtMenuItem';

// Utils
import type { DiningCourt, Meal } from '@/util/menus';


type DiningCourtMealProps = {
    location: DiningCourt,
    meal?: Meal
}
export default function DiningCourtMeal(props: DiningCourtMealProps) {
    return props.meal?.Status === 'Open' ? (
        <Disclosure>
            <Disclosure.Button className="flex gap-3 items-center rounded border border-tertiary hover:border-secondary px-4 py-2 transition duration-150">
                {({ open }) => (
                    <>
                        <FaCircleCheck className="text-lime-500" />
                        {props.location}

                        <FaChevronDown className={`bg-content-secondary rounded-full p-1 transition duration-100` + (open ? ' rotate-180' : '')} />
                    </>
                )}
            </Disclosure.Button>

            <Disclosure.Panel className="text-sm">
                {props.meal.Stations.map((s) => (
                    <section
                        className="rounded overflow-clip border border-tertiary divide-y divide-tertiary mb-2"
                        key={s.Name + props.meal?.ID}
                    >
                        <h5 className="font-medium px-2 py-1 bg-content-secondary">
                            {s.Name}
                        </h5>
                        {s.Items.map((i) => (
                            <DiningCourtMenuItem {...i} key={i.ID + props.meal?.ID} />
                        ))}
                    </section>
                ))}
            </Disclosure.Panel>
        </Disclosure>
    ) : (
        <div className="flex gap-3 items-center rounded border border-tertiary px-4 py-2">
            <FaCircleXmark className="text-red-500" />
            {props.location}
        </div>
    )
}
