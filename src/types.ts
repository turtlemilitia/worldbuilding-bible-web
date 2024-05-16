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
  canUpdate: boolean;
  canDelete: boolean;
}

export type TOptionList = {
  id: number;
  name: string;
}

export type TCanHaveImages = {
  images?: TImage[];
}

export type TCanHaveNotes = {
  notes?: TNote[];
}

export type TSystem = TGenericPost & TPlayerTools & TCanHaveImages & {
  id: number;
  slug: string;
  name: string;
  content: string;
}

export type TCompendium = TGenericPost & TPlayerTools & TCanHaveImages & {
  notebook?: TGenericPostList;
  characters?: TGenericPostList[];
  concepts?: TGenericPostList[];
  currencies?: TGenericPostList[];
  deities?: TGenericPostList[];
  factions?: TGenericPostList[];
  items?: TGenericPostList[];
  languages?: TGenericPostList[];
  locations?: TLocationList[];
  naturalResources?: TGenericPostList[];
  pantheons?: TGenericPostList[];
  planes?: TGenericPostList[];
  religions?: TGenericPostList[];
  species?: TGenericPostList[];
  spells?: TGenericPostList[];
  stories?: TGenericPostList[];
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

export type TEncounterType = TOptionList

export type TEncounter = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  type: TEncounterType
}

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

export type TLocationList = TGenericPostList & {
  parent?: TLocation;
}

export type TLocationType = TOptionList

export type TLocationGovernmentType = TOptionList

export type TPantheon = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TQuestType = TOptionList

export type TQuest = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  type: TQuestType,
  parent?: TQuest,
  children?: TQuest[]
}

export type TReligion = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TSpecies = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TSpell = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TStory = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TNaturalResource = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TPlane = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes

export type TNotebook = TGenericPost & TPlayerTools & TCanHaveImages & {
  notes: TGenericPostList[]
}

export type TNote = TGenericPost & TPlayerTools & TCanHaveImages

export type TCampaign = TGenericPost & TPlayerTools & TCanHaveImages & {
  gameMaster?: TUser;
  compendium?: TGenericPost;
  users: TUser[];
  invitations: TInvitation[];
  sessions: (TGenericPostList & { session_number: TSession['session_number'] })[];
  encounters: (TGenericPostList & { type: TEncounter['type'] })[];
  quests: (TGenericPostList & { type: TQuest['type'] })[];
  notebook?: TNotebook
}

export type TSession = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  session_number: number
  scheduled_at: string
  duration: number
}

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