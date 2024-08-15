import InteractiveMap from '@/app/map/InteractiveMap';

// Utils
import buildings from '@/util/buildings';


export default function Map() {
    return (
        <main className="flex-grow pt-16 flex flex-col">
            <div className="container">
                <h1 className="text-4xl font-bold mb-3">
                    Class map
                </h1>
            </div>

            <InteractiveMap buildings={buildings} />
        </main>
    )
}
