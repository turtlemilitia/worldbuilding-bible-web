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

export type TTypesAllowedString = 'compendium'
  |'campaign'
  |'session'
  |'system'
  |'character'
  |'concept'
  |'currency'
  |'deity'
  |'faction'
  |'item'
  |'language'
  |'location'
  |'naturalResource'
  |'pantheon'
  |'plane'
  |'religion'
  |'species'
  |'spell'
  |'story'
export type TTypesPlural = 'compendia'
  |'campaigns'
  |'sessions'
  |'systems'
  |'characters'
  |'concepts'
  |'currencies'
  |'deities'
  |'factions'
  |'items'
  |'languages'
  |'locations'
  |'naturalResources'
  |'pantheons'
  |'planes'
  |'religions'
  |'species'
  |'spells'
  |'stories'