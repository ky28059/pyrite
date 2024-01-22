export type EventsResponse = {
    '@odata.count': number,
    '@search.coverage': null,
    '@search.facets': {},

    value: BoilerLinkEventData[]
}

export type BoilerLinkEventData = {
    id: string,
    institutionId: number,
    organizationId: number,
    organizationIds: [],
    branchId: number,
    branchIds: [],

    organizationName: string,
    organizationProfilePicture: string,
    organizationNames: [],
    name: string, // The name of the event
    description: string,
    location: string,
    startsOn: string, // ISO
    endsOn: string, // ISO
    theme: string,
    imagePath?: string,
    categoryIds: string[],
    categoryNames: string[],
    benefitNames: string[],
    visibility: 'Public',
    status: 'Approved',
    latitude: null,
    longitude: null,

    recScore: null,
    '@search.score': number
}
