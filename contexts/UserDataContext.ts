import {createContext} from 'react';


export type UserData = {
    courseIds: string[],
    pinnedOrgIds: string[],
    options: {
        theme: 'light' | 'dark',
        time: '12' | '24'
    }
}

export const defaultUserData: UserData = {
    courseIds: [],
    pinnedOrgIds: [],
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
