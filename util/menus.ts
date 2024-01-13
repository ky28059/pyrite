import {DateTime} from 'luxon';


export type MealType = 'Breakfast' | 'Lunch' | 'Late Lunch' | 'Dinner';
export type DiningCourt = 'Wiley' | 'Ford' | 'Hillenbrand' | 'Earhart' | 'Windsor';

export type MealsResponse = {
    Date: string,
    IsPublished: boolean,
    Location: DiningCourt,
    Meals: Meal[],
    Notes: string
}
export type Meal = {
    Hours: {StartTime: string, EndTime: string} | null,
    ID: string,
    Name: MealType,
    Notes: null,
    Order: number,
    Stations: Station[],
    Status: "Open" | "Closed",
    Type: MealType // except also "Snack"?
}
type Station = {
    BackgroundColor: null,
    ForegroundColor: null,
    IconUrl: null,
    Items: Item[],
    Name: string,
    Notes: null
}
type Item = {
    Allergens: Allergen[],
    ID: string,
    IsVegetarian: boolean,
    Name: string,
    NutritionReady: boolean
}
type Allergen = {
    Name: string,
    Value: string
}

export async function getMenu(date: DateTime, location: DiningCourt) {
    const res = await (await fetch(`https://api.hfs.purdue.edu/menus/v2/locations/${location}/${date.toISODate()}`)).json();
    return res as MealsResponse;
}
