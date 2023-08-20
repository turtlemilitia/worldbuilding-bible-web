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
  hasLocations?: boolean;
  hasCharacters?: boolean;
  locations?: TLocation[]
  characters?: TCharacter[]
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
  // species: todo
}