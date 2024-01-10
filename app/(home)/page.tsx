import HomeClock from '@/app/(home)/HomeClock';
import HomeDatePicker from '@/app/(home)/HomeDatePicker';
import Calendar from '@/app/(home)/Calendar';

import {loadClasses} from '@/util/unitime';


export default async function Home() {
    const classes = await loadClasses();

    return (
        <main className="container py-24">
            <HomeClock />
            <HomeDatePicker />

            <Calendar classes={classes} />
        </main>
    )
}
