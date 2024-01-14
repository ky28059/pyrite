import {NextResponse} from 'next/server';
import {getMenu} from '@/util/menus';


/**
 * API route to circumvent CORS on the dining menu API, as well as cache API requests for efficient
 * querying. Returns menus for a given day, provided in ISO format in the path params.
 */
export async function GET(request: Request, {params}: {params: {date: string}}) {
    const data = await Promise.all([
        getMenu(params.date, 'Wiley'),
        getMenu(params.date, 'Ford'),
        getMenu(params.date, 'Hillenbrand'),
        getMenu(params.date, 'Earhart'),
        getMenu(params.date, 'Windsor'),
    ]);

    return NextResponse.json(data);
}
