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
  concepts?: TConcept[],
  species?: TSpecies[],
  locations?: TLocation[]
  characters?: TCharacter[],
  items?: TItem[],
  factions?: TFaction[],
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
