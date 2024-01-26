export type TQueryParams = string | string[][] | Record<string, string> | URLSearchParams

export type TImage = {
  id: number;
  name: string;
  alt: string;
  thumbnail: string;
  original: string;
  pivot?: TImageableImagePivot
}

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
  hasConcepts?: boolean;
  hasCharacters?: boolean;
  hasCurrencies?: boolean;
  hasDeities?: boolean;
  hasItems?: boolean;
  hasEncounters?: boolean;
  hasFactions?: boolean;
  hasLanguages?: boolean;
  hasLocations?: boolean;
  hasReligions?: boolean;
  hasPantheons?: boolean;
  hasQuests?: boolean;
  hasSpecies?: boolean;
  hasSpells?: boolean;
  hasStories?: boolean;
  hasNaturalResources?: boolean;
  hasPlanes?: boolean;
  characters?: TCharacter[];
  concepts?: TConcept[];
  currencies?: TCurrency[];
  deities?: TDeity[];
  encounters?: TEncounter[];
  factions?: TFaction[];
  items?: TItem[];
  languages?: TLanguage[];
  locations?: TLocation[];
  naturalResources?: TNaturalResource[];
  pantheons?: TPantheon[];
  planes?: TPlane[];
  quests?: TQuest[];
  religions?: TReligion[];
  species?: TSpecies[];
  spells?: TSpell[];
  stories?: TStory[];
  images?: TImage[];
}

export type TConcept = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TCharacter = {
  id: number;
  slug: string;
  name: string;
  age: string;
  gender: string;
  content: string;
  species: TSpecies;
  languages?: TLanguage[];
  factions?: TFaction[];
}

export type TCurrency = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TDeity = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TEncounter = {
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

export type TItem = {
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

export type TLocationType = {
  id: number;
  name: string;
}

export type TLocationGovernmentType = {
  id: number;
  name: string;
}

export type TPantheon = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TQuest = {
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

export type TSpecies = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TSpell = {
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
  hasNotes?: boolean;
  notes?: TNote[]
}

export type TNote = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}

export type TCampaignVisibility = {
  id: number;
  name: string;
}

export type TCampaign = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
  visibility: TCampaignVisibility;
  hasSessions: boolean;
  sessions: TSession[];
}

export type TSession = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}

export type TImageableImagePivot = {
  id: number;
  type: TImageType,
  image?: TImage;
}

export type TImageType = {
  id: number;
  name: string;
}

export type TTypesAllowed = TCompendium|TLocation|TCharacter|TConcept|TNotebook|TCampaign
export type TTypesAllowedString = 'compendium'|'location'|'character'|'concept'|'campaign'