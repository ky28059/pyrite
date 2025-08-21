import { useContext, useMemo } from 'react';
import UserDataContext from '@/contexts/UserDataContext';
import type { Section } from '@/util/unitime';


export default function useUserClasses(classes: { [p: string]: Section }) {
    const { data } = useContext(UserDataContext);

    const validIds = useMemo(() => {
        return data.courseIds.filter((id) => classes[id]);
    }, [data.courseIds]);

    // TODO: filter out invalid classes from user data?

    return validIds;
}
