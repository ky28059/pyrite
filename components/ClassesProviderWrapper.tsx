import type { ReactNode } from 'react';
import ClassesProvider from '@/components/ClassesProvider';
import { loadClasses } from '@/util/unitime';


export default async function ClassesProviderWrapper(props: { children: ReactNode }) {
    const classes = await loadClasses();

    return (
        <ClassesProvider classes={classes}>
            {props.children}
        </ClassesProvider>
    )
}
