'use client'

import { ReactNode, useContext } from 'react';
import { RadioGroup } from '@headlessui/react';
import UserDataContext, { UserData } from '@/contexts/UserDataContext';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';


export default function PreferencesSection() {
    const { data, setData } = useContext(UserDataContext);

    function changeTheme(theme: UserData['options']['theme']) {
        const newData = { ...data };
        newData.options.theme = theme;
        setData(newData);
    }

    function changeTime(time: UserData['options']['time']) {
        const newData = { ...data };
        newData.options.time = time;
        setData(newData);
    }

    return (
        <div className="space-y-6">
            <RadioGroup value={data.options.theme} onChange={changeTheme} className="flex flex-col">
                <RadioGroup.Label className="mb-2 font-semibold text-secondary">
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

            <RadioGroup value={data.options.time} onChange={changeTime} className="flex flex-col">
                <RadioGroup.Label className="mb-2 font-semibold text-secondary">
                    Time format
                </RadioGroup.Label>

                <div className="flex gap-2">
                    <RadioOption value="12">
                        12 hour
                    </RadioOption>
                    <RadioOption value="24">
                        24 hour
                    </RadioOption>
                </div>
            </RadioGroup>
        </div>
    )
}

function RadioOption(props: { value: string, children: ReactNode }) {
    return (
        <RadioGroup.Option
            className="flex gap-2 justify-center items-center text-sm font-medium flex-grow border border-tertiary ui-checked:ring-theme ui-not-checked:hover:border-primary transition duration-150 ui-checked:ring-2 rounded px-4 py-2 cursor-pointer"
            value={props.value}
        >
            {props.children}
        </RadioGroup.Option>
    )
}
