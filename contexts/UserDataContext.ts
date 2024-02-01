import {createContext} from 'react';


export type UserData = {
    courseIds: string[],
    eventIds: string[],
    pinnedOrgIds: string[],
    favoriteFoodIds: string[],
    options: {
        theme: 'light' | 'dark',
        time: '12' | '24'
    }
}

export const defaultUserData: UserData = {
    courseIds: [],
    eventIds: [],
    pinnedOrgIds: [],
    favoriteFoodIds: [],
    options: {
        theme: 'dark',
        time: '12'
    }
}

type UserDataContext = {
    data: UserData,
    setData: (d: UserData) => void,
    setLocalData: (d: UserData) => void,
}

const UserDataContext = createContext<UserDataContext>({
    data: defaultUserData,
    setData: () => {},
    setLocalData: () => {}
});
export default UserDataContext;
