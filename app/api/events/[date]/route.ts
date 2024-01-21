import {NextResponse} from 'next/server';
import type {EventsResponse} from '@/util/boilerlink';


/**
 * API route to cache BoilerLink API requests for efficient querying. Returns events for a given day, provided in ISO
 * format in the path params.
 */
export async function GET(request: Request, {params}: {params: {date: string}}) {
    console.log(params.date);
    const res: EventsResponse = await (await fetch(`https://boilerlink.purdue.edu/api/discovery/event/search?endsAfter=${params.date}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=`)).json()
    return NextResponse.json(res);
}
