import HomeClock from '@/app/(home)/HomeClock';
import HomeDatePicker from '@/app/(home)/HomeDatePicker';


export default function Home() {
    return (
        <main className="container py-24">
            <HomeClock />
            <HomeDatePicker />

            <div className="relative grid grid-rows-[repeat(144,_0.5rem)] grid-cols-[4rem_1fr_2rem]">
                {/* Hour labels */}
                {Array(12).fill(0).map((_, i) => (
                    <p style={{gridRowStart: i * 12 + 1}} className="text-sm text-secondary dark:text-secondary-dark">
                        {i + 7}:00
                    </p>
                ))}

                {/* Horizontal rules (one every two grid rows, or 10 minutes) */}
                {/* TODO: incredibly hacky */}
                <div className="-z-10 absolute inset-0 flex flex-col pl-12">
                    {Array(72).fill(0).map((_, i) => (
                        <hr className="h-4 border-t border-tertiary dark:border-tertiary-dark" />
                    ))}
                </div>

                <div style={{gridRowStart: 14, gridRowEnd: 24, gridColumnStart: 2}} className="bg-theme text-white rounded px-4 py-2">
                    hi
                </div>

                <div style={{gridRowStart: 26, gridRowEnd: 36, gridColumnStart: 2}} className="bg-theme text-white rounded px-4 py-2">
                    hi
                </div>
            </div>
        </main>
    )
}
