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
            className="relative group w-full hover:bg-content-secondary pl-2 pr-6 py-0.5 text-secondary text-left"
            onClick={toggleFavorite}
        >
            <span>
                {props.Name}{' '}

                {props.Allergens?.filter((a) => a.Value).map((a) => (
                    <img
                        src={allergenIconUrl(a)}
                        key={props.ID + a.Name}
                        className="inline size-4"
                        alt={a.Name}
                    />
                ))}
            </span>

            {active ? (
                <FaStar className="absolute right-2 inset-y-0 my-auto text-theme ml-auto flex-none" />
            ) : (
                <FaRegStar className="absolute right-2 inset-y-0 my-auto hidden group-hover:block text-secondary ml-auto flex-none" />
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
