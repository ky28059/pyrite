import { readFileSync } from 'node:fs';


export type Building = {
    name: string
    lat: number
    lng: number
    abbr: string
}

const buildings: Building[] = JSON.parse(readFileSync(process.cwd() + '/util/buildings/buildings.json').toString());
export default buildings;
