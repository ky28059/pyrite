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
    Items: MenuItem[],
    Name: string,
    Notes: null
}
export type MenuItem = {
    Allergens?: Allergen[],
    ID: string,
    IsVegetarian: boolean,
    Name: string,
    NutritionReady: boolean
}
export type Allergen = {
    Name: string,
    Value: boolean
}

export async function getMenu(date: string, location: DiningCourt) {
    const res = await (await fetch(`https://api.hfs.purdue.edu/menus/v2/locations/${location}/${date}`)).json();
    return res as MealsResponse;
}
