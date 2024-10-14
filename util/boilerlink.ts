'use server'

import { DateTime } from 'luxon';
import { ZONE } from '@/util/schedule';


export type EventsResponse = {
    '@odata.count': number,
    '@search.coverage': null,
    '@search.facets': {},

    value: BoilerLinkEventData[]
}

export type EventTheme = 'Athletics' | 'Social' | 'CommunityService' | 'GroupBusiness'
    | 'ThoughtfulLearning' | 'Arts' | 'Fundraising' | 'Cultural' | 'Spirituality'

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
    theme: EventTheme,
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

type OrganizationsResponse = {
    '@odata.context': string,
    '@odata.count': number,
    '@search.coverage': number,

    value: BoilerLinkOrganizationData[]
}

export type BoilerLinkOrganizationData = {
    '@search.score': number,

    BranchId: number,
    CategoryIds: number[],
    CategoryNames: string[],
    Description: string,
    Id: string,
    InstitutionId: number,
    Name: string,
    ParentOrganizationId: number,
    ProfilePicture: string | null,
    ShortName: string | null,
    Status: 'Active',
    Summary: string,
    Visibility: 'Public',
    WebsiteKey: 'abc'
}

export async function fetchOrganizations() {
    const data = await (await fetch('https://boilerlink.purdue.edu/api/discovery/search/organizations?orderBy%5B0%5D=UpperName%20asc&filter=&query=&skip=0&top=2000')).json()
    return data as OrganizationsResponse;
}

export async function fetchEvents(date: string) {
    // Query only for events that start *on* the requested day.
    // Set zone when parsing because BoilerLink is incapable of handling timezones other than Indianapolis.
    const rangeStart = DateTime.fromISO(date, { zone: ZONE });
    const rangeEnd = rangeStart.plus({ days: 1 });

    const res = await (await fetch(`https://boilerlink.purdue.edu/api/discovery/event/search?startsAfter=${rangeStart.toISO()}&startsBefore=${rangeEnd.toISO()}&orderByField=startsOn&orderByDirection=ascending&status=Approved&take=100&query=`)).json()
    return res as EventsResponse;
}
