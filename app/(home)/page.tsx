import HomeClock from '@/app/(home)/HomeClock';
import Schedule from '@/app/(home)/Schedule';


export default async function Home() {
    return (
        <>
            <HomeClock />
            <Schedule />
        </>
    )
}
