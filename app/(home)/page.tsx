import HomeClock from '@/app/(home)/HomeClock';
import Schedule from '@/app/(home)/Schedule';

import {loadClasses} from '@/util/unitime';


export default async function Home() {
    const classes = await loadClasses();

    return (
        <main className="container py-24">
            <HomeClock />
            <Schedule classes={classes} />
        </main>
    )
}
