'use client'

import { useContext } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa6';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';

// Utils
import type { Allergen, MenuItem } from '@/util/menus';


export default function DiningCourtMenuItem(props: MenuItem) {
    const { data, setData } = useContext(UserDataContext);
    const active = data.favoriteFoodIds.includes(props.ID);

    function toggleFavorite() {
        const newData = { ...data };
        newData.favoriteFoodIds = active
            ? newData.favoriteFoodIds.filter((i) => i !== props.ID)
            : [...newData.favoriteFoodIds, props.ID];

        setData(newData);
    }

    return (
        <button
            className="group w-full hover:bg-content-secondary px-2 py-0.5 text-secondary flex flex-wrap items-center"
            onClick={toggleFavorite}
        >
            <span className="mr-1.5">{props.Name}</span>
            {props.Allergens?.filter((a) => a.Value).map((a) => (
                <img
                    src={allergenIconUrl(a)}
                    key={props.ID + a.Name}
                    className="size-4"
                    alt={a.Name}
                />
            ))}

            {active ? (
                <FaStar className="text-theme ml-auto" />
            ) : (
                <FaRegStar className="hidden group-hover:block text-secondary ml-auto" />
            )}
        </button>
    )
}

function allergenIconUrl(a: Allergen) {
    // Un-pluralize names (eg. soy -> soy, peanuts -> peanut)
    const name = a.Name.endsWith('s')
        ? a.Name.slice(0, a.Name.length - 1)
        : a.Name;
    return `https://api.hfs.purdue.edu/Menus/Content/dietaryTagIcons/PurdueMenusIconsNoBackground_${name.replaceAll(' ', '')}.svg`;
}
