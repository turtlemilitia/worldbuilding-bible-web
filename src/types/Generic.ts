import { TCanHaveImages } from '@/types'

export interface Identifiable {
  id: number
}

export interface Sluggable {
  slug: string
}

export interface Named {
  name: string;
}

export interface Completable {
  completedAt: string;
}

export type TGenericPostBasic = Identifiable & Sluggable & Named

export type TPlayerTools = {
  canUpdate: boolean;
  canDelete: boolean;
}

export type TGenericPost = TGenericPostBasic & TPlayerTools & {
  content: string;
}

export type TOptionList = Identifiable & Named

export type TTypesAllowed = TGenericPost & TPlayerTools & TCanHaveImages

export type TTypesAllowedString = 'compendium'|'location'|'character'|'concept'|'campaign'|'session'|'system'
export type TTypesPlural = 'compendia'|'locations'|'characters'|'concepts'|'campaigns'|'sessions'|'systems'