import type {DiningCourt, Meal} from '@/util/menus';
import {FaCircleCheck, FaCircleXmark} from 'react-icons/fa6';


type DiningCourtMealProps = {
    location: DiningCourt,
    meal?: Meal
}
export default function DiningCourtMeal(props: DiningCourtMealProps) {
    return (
        <div className="flex gap-3 items-center rounded border border-tertiary dark:border-tertiary-dark px-4 py-2">
            {props.meal?.Status === 'Open' ? (
                <FaCircleCheck className="text-lime-500" />
            ) : (
                <FaCircleXmark className="text-red-500" />
            )}
            {props.location}
        </div>
    )
}
