'use client'

import {ReactNode, useContext} from 'react';
import {RadioGroup} from '@headlessui/react';
import UserDataContext, {UserData} from '@/contexts/UserDataContext';
import {BsMoonFill, BsSunFill} from 'react-icons/bs';


export default function PreferencesContent() {
    const {data, setData} = useContext(UserDataContext);

    function changeTheme(theme: UserData['options']['theme']) {
        const newData = {...data};
        newData.options.theme = theme;
        setData(newData);
    }

    return (
        <div>
            <RadioGroup value={data.options.theme} onChange={changeTheme} className="flex flex-col">
                <RadioGroup.Label className="mb-2 font-semibold">
                    Color theme
                </RadioGroup.Label>

                <div className="flex gap-2">
                    <RadioOption value="light">
                        <BsSunFill /> Light
                    </RadioOption>
                    <RadioOption value="dark">
                        <BsMoonFill /> Dark
                    </RadioOption>
                </div>
            </RadioGroup>
        </div>
    )
}

function RadioOption(props: {value: string, children: ReactNode}) {
    return (
        <RadioGroup.Option
            className="flex gap-2 justify-center items-center text-sm font-medium flex-grow border border-tertiary dark:border-tertiary-dark ui-checked:ring-theme ui-not-checked:hover:border-black dark:ui-not-checked:hover:border-white transition duration-150 ui-checked:ring-2 rounded px-4 py-2 cursor-pointer"
            value={props.value}
        >
            {props.children}
        </RadioGroup.Option>
    )
}
