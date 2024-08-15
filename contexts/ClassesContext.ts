import {createContext} from 'react';
import type {Section} from '@/util/unitime';


export type Classes = {[id: string]: Section}
const ClassesContext = createContext<Classes>({});
export default ClassesContext;
