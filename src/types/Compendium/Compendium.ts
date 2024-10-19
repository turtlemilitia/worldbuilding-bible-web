import {
  TCanHaveImages,
  TCanHaveNotes,
  TGenericPost,
  TGenericPostBasic,
  TOptionList,
  TPlayerTools,
  TUser,
} from '@/types'

export type TCompendium = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  creator: TUser;
} & TCompendiumRelationships

export type TCompendiumRelationships = {
  characters?: TGenericPostBasic[];
  concepts?: TGenericPostBasic[];
  currencies?: TGenericPostBasic[];
  deities?: TGenericPostBasic[];
  factions?: TGenericPostBasic[];
  items?: TGenericPostBasic[];
  languages?: TGenericPostBasic[];
  locations?: TLocationList[];
  naturalResources?: TGenericPostBasic[];
  pantheons?: TGenericPostBasic[];
  planes?: TGenericPostBasic[];
  religions?: TGenericPostBasic[];
  species?: TGenericPostBasic[];
  spells?: TGenericPostBasic[];
  stories?: TGenericPostBasic[];
}


export type TConcept = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TCharacter = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  age: string;
  gender: string;
  species: TSpecies;
  languages?: TLanguage[];
  factions?: TFaction[];
}

export type TCurrency = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TDeity = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TFaction = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TItem = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TLanguage = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TLocation = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  compendium: TCompendium;
  parent?: TLocation;
  type: TLocationType;
  demonym?: string;
  population?: number;
  governmentType?: TLocationGovernmentType;
  hasSubLocations?: boolean;
  aliases?: string[];
  children?: TLocation[];
}

export type TLocationList = TGenericPostBasic & {
  parent?: TLocation;
}

export type TLocationType = TOptionList

export type TLocationGovernmentType = TOptionList

export type TPantheon = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TReligion = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TSpecies = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TSpell = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TStory = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TNaturalResource = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TPlane = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes