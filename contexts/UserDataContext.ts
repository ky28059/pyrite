import {createContext} from 'react';


export type UserData = {
    courseIds: string[]
}

export const defaultUserData: UserData = {
    courseIds: []
}

export const UserDataContext = createContext<UserData>(defaultUserData);
