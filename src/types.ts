export type TUser = {
  id: number;
  name: string;
  email: string;
  pins?: TPin[];
  favourites?: TFavourite[];
  characters?: TCharacter[];
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

export type TGenericPostBasic = {
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
  notebook?: TGenericPostBasic;
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

export type TLocationList = TGenericPostBasic & {
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
  notes: TGenericPostBasic[]
}

export type TNote = TGenericPost & TPlayerTools & TCanHaveImages

export type TPin = {
  id: number
} & ({
  pinnableType: 'character'
  pinnable: TCharacter
} | {
  pinnableType: 'concepts'
  pinnable: TConcept
} | {
  pinnableType: 'currencies'
  pinnable: TCurrency
} | {
  pinnableType: 'deities'
  pinnable: TDeity
} | {
  pinnableType: 'factions'
  pinnable: TFaction
} | {
  pinnableType: 'items'
  pinnable: TItem
} | {
  pinnableType: 'languages'
  pinnable: TLanguage
} | {
  pinnableType: 'location'
  pinnable: TLocation
} | {
  pinnableType: 'naturalResources'
  pinnable: TNaturalResource
} | {
  pinnableType: 'pantheons'
  pinnable: TPantheon
} | {
  pinnableType: 'plane'
  pinnable: TPlane
} | {
  pinnableType: 'religion'
  pinnable: TReligion
} | {
  pinnableType: 'species'
  pinnable: TSpecies
} | {
  pinnableType: 'spell'
  pinnable: TLocation
} | {
  pinnableType: 'story'
  pinnable: TStory
} | {
  pinnableType: 'encounter',
  pinnable: TEncounter
} | {
  pinnableType: 'session',
  pinnable: TSession
} | {
  pinnableType: 'quest',
  pinnable: TQuest
})

export type TFavourite = {
  id: number;
} & ({
  favouritableType: 'character'
  favouritable: TCharacter
} | {
  favouritableType: 'concepts'
  favouritable: TConcept
} | {
  favouritableType: 'currencies'
  favouritable: TCurrency
} | {
  favouritableType: 'deities'
  favouritable: TDeity
} | {
  favouritableType: 'factions'
  favouritable: TFaction
} | {
  favouritableType: 'items'
  favouritable: TItem
} | {
  favouritableType: 'languages'
  favouritable: TLanguage
} | {
  favouritableType: 'location'
  favouritable: TLocation
} | {
  favouritableType: 'naturalResources'
  favouritable: TNaturalResource
} | {
  favouritableType: 'pantheons'
  favouritable: TPantheon
} | {
  favouritableType: 'plane'
  favouritable: TPlane
} | {
  favouritableType: 'religion'
  favouritable: TReligion
} | {
  favouritableType: 'species'
  favouritable: TSpecies
} | {
  favouritableType: 'spell'
  favouritable: TLocation
} | {
  favouritableType: 'story'
  favouritable: TStory
} | {
  favouritableType: 'encounter',
  favouritable: TEncounter
} | {
  favouritableType: 'session',
  favouritable: TSession
} | {
  favouritableType: 'quest',
  favouritable: TQuest
})

export type TCampaign = TGenericPost & TPlayerTools & TCanHaveImages & {
  gameMaster?: TUser;
  compendium?: TGenericPost;
  users: TUser[];
  invitations: TInvitation[];
  sessions: (TGenericPostBasic & { session_number: TSession['session_number'] })[];
  encounters: (TGenericPostBasic & { type: TEncounter['type'] })[];
  quests: (TGenericPostBasic & { type: TQuest['type'] })[];
  notebook?: TNotebook
  pins: TPin[]
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