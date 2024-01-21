'use client'

import type {ReactNode} from 'react';
import ClassesContext, {Classes} from '@/contexts/ClassesContext';


export default function ClassesProvider(props: {children: ReactNode, classes: Classes}) {
    return (
        <ClassesContext.Provider value={props.classes}>
            {props.children}
        </ClassesContext.Provider>
    )
}
