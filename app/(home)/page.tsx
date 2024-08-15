import HomeContent from '@/app/(home)/HomeContent';
import { loadClasses } from '@/util/unitime';


export default async function Home() {
    const classes = await loadClasses();
    return <HomeContent classes={classes} />;
}
