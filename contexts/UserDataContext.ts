import {createContext} from 'react';


export type UserData = {
    courseIds: string[]
}

export const defaultUserData: UserData = {
    courseIds: []
}

type UserDataContext = {
    data: UserData,
    setData: (d: UserData) => void
}

export const UserDataContext = createContext<UserDataContext>({
    data: defaultUserData,
    setData: () => {}
});