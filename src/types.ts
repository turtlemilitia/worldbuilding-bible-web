export type TQueryParams = string | string[][] | Record<string, string> | URLSearchParams

export type TUser = {
  id: number;
  name: string;
  email: string;
}

export type TInvitation = {
  id: number;
  email: string;
}

export type TImage = {
  id: number;
  name: string;
  alt: string;
  thumbnail: string;
  original: string;
  pivot?: TImageableImagePivot
}

export type TGenericPostList = {
  id: number;
  slug: string;
  name: string;
}

export type TGenericPost = {
  id: number;
  slug: string;
  name: string;
  content: string;
}

type TOptionList = {
  id: number;
  name: string;
}

export type TCanHaveImages = {
  images?: TImage[];
}

export type TSystem = TGenericPost & TPlayerTools & TCanHaveImages & {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TCompendium = TGenericPost & TPlayerTools & TCanHaveImages & {
  characters?: TGenericPostList[];
  concepts?: TGenericPostList[];
  currencies?: TGenericPostList[];
  deities?: TGenericPostList[];
  encounters?: TGenericPostList[];
  factions?: TGenericPostList[];
  items?: TGenericPostList[];
  languages?: TGenericPostList[];
  locations?: TLocationList[];
  naturalResources?: TGenericPostList[];
  pantheons?: TGenericPostList[];
  planes?: TGenericPostList[];
  quests?: TGenericPostList[];
  religions?: TGenericPostList[];
  species?: TGenericPostList[];
  spells?: TGenericPostList[];
  stories?: TGenericPostList[];
}

export type TConcept = TGenericPost & TPlayerTools & TCanHaveImages

export type TCharacter = TGenericPost & TPlayerTools & TCanHaveImages & {
  age: string;
  gender: string;
  species: TSpecies;
  languages?: TLanguage[];
  factions?: TFaction[];
}

export type TCurrency = TGenericPost & TPlayerTools & TCanHaveImages

export type TDeity = TGenericPost & TPlayerTools & TCanHaveImages

export type TEncounter = TGenericPost & TPlayerTools & TCanHaveImages

export type TFaction = TGenericPost & TPlayerTools & TCanHaveImages

export type TItem = TGenericPost & TPlayerTools & TCanHaveImages

export type TLanguage = TGenericPost & TPlayerTools & TCanHaveImages

export type TLocation = TGenericPost & TPlayerTools & TCanHaveImages & {
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

export type TLocationList = TGenericPostList & {
  parent?: TLocation;
}

export type TLocationType = TOptionList

export type TLocationGovernmentType = TOptionList

export type TPantheon = TGenericPost & TPlayerTools & TCanHaveImages

export type TQuest = TGenericPost & TPlayerTools & TCanHaveImages

export type TReligion = TGenericPost & TPlayerTools & TCanHaveImages

export type TSpecies = TGenericPost & TPlayerTools & TCanHaveImages

export type TSpell = TGenericPost & TPlayerTools & TCanHaveImages

export type TStory = TGenericPost & TPlayerTools & TCanHaveImages

export type TNaturalResource = TGenericPost & TPlayerTools & TCanHaveImages

export type TPlane = TGenericPost & TPlayerTools & TCanHaveImages

export type TNotebook = TGenericPost & TPlayerTools & TCanHaveImages & {
  notes: TGenericPostList[]
}

export type TNote = TGenericPost & TPlayerTools & TCanHaveImages

export type TCampaign = TGenericPost & TPlayerTools & TCanHaveImages & {
  sessions: TGenericPostList[];
  gameMaster?: TUser;
  users: TUser[];
  invitations: TInvitation[];
}

export type TSession = TGenericPost & TPlayerTools & TCanHaveImages

export type TImageableImagePivot = {
  id: number;
  type: TImageType,
  image?: TImage;
}

export type TImageType = TOptionList

type TPlayerTools = {
  canUpdate: boolean;
  canDelete: boolean;
}

export type TTypesAllowed = TGenericPost & TPlayerTools & TCanHaveImages

export type TTypesAllowedString = 'compendium'|'location'|'character'|'concept'|'campaign'|'session'|'system'