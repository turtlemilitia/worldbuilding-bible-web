export type TQueryParams = string | string[][] | Record<string, string> | URLSearchParams

export type TSystem = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}

export type TCompendium = {
  id?: number;
  slug?: string;
  name: string;
  age?: number;
  gender?: string;
  content: string;
  hasConcepts?: boolean;
  hasSpecies?: boolean;
  hasLocations?: boolean;
  hasCharacters?: boolean;
  hasItems?: boolean;
  hasFactions?: boolean;
  hasLanguages?: boolean;
  hasReligions?: boolean;
  hasPantheons?: boolean;
  hasCurrencies?: boolean;
  hasStories?: boolean;
  hasNaturalResources?: boolean;
  hasPlanes?: boolean;
  concepts?: TConcept[];
  species?: TSpecies[];
  locations?: TLocation[];
  characters?: TCharacter[];
  items?: TItem[];
  factions?: TFaction[];
  languages?: TLanguage[];
  religions?: TReligion[];
  pantheons?: TPantheon[];
  currencies?: TCurrency[];
  stories?: TStory[];
  naturalResources?: TNaturalResource[];
  planes?: TPlane[];
}

export type TConcept = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TSpecies = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TLocationType = {
  id: number;
  name: string;
}

export type TLocationGovernmentType = {
  id: number;
  name: string;
}

export type TLocation = {
  id: number;
  slug: string;
  compendium: TCompendium;
  parent?: TLocation;
  name: string;
  type: TLocationType;
  content: string;
  demonym?: string;
  population?: number;
  governmentType?: TLocationGovernmentType;
  hasSubLocations?: boolean;
  aliases?: string[];
  children?: TLocation[]
}

export type TCharacter = {
  id: number;
  slug: string;
  name: string;
  age: string;
  gender: string;
  content: string;
  species: TSpecies
}

export type TItem = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TFaction = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TLanguage = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TReligion = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TPantheon = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TCurrency = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TStory = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TNaturalResource = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TPlane = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TNotebook = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
  hasNotes: boolean;
  notes?: TNote[]
}

export type TNote = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}

export type TCampaign = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
  hasSessions: boolean;
  sessions: TSession[];
}

export type TSession = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}