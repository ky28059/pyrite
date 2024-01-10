'use client'

import {useContext} from 'react';
import UserDataContext, {UserData} from '@/contexts/UserDataContext';


export default function PreferencesContent() {
    const {data, setData} = useContext(UserDataContext);

    function changeTheme(theme: UserData['options']['theme']) {
        const newData = {...data};
        newData.options.theme = theme;
        setData(newData);
    }

    // TODO
    return (
        <div>
            <button onClick={() => changeTheme('dark')}>
                dark
            </button>
            <button onClick={() => changeTheme('light')}>
                light
            </button>
        </div>
    )
}
