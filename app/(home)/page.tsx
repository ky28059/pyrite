import HomeClock from '@/app/(home)/HomeClock';
import Schedule from '@/app/(home)/Schedule';

import {loadClasses} from '@/util/unitime';


export default async function Home() {
    const classes = await loadClasses();

    return (
        <>
            <HomeClock />
            <Schedule classes={classes} />
        </>
    )
}
