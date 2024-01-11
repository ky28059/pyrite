import {createContext} from 'react';


export type UserData = {
    courseIds: string[],
    options: {
        theme: 'light' | 'dark'
    }
}

export const defaultUserData: UserData = {
    courseIds: [],
    options: {
        theme: 'light'
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
