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
  content: string;
  hasLocations?: boolean;
  locations?: TLocation[]
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