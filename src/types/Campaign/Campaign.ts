import {
  Completable,
  TCanHaveImages,
  TCanHaveNotes,
  TGenericPost,
  TGenericPostBasic,
  TInvitation, TLocation, TOptionList,
  TPermission,
  TPin,
  TPlayerTools,
  TSession,
  TUser,
} from '@/types'

export type TCampaign = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  gameMaster?: TUser;
  compendium?: TGenericPost;
  users: TUser[];
  invitations: TInvitation[];
  pins: TPin[]
  permissions: TPermission[]
} & TCampaignRelationships

export type TCampaignRelationships = {
  sessions: (TGenericPostBasic & { session_number: TSession['session_number'] })[];
  encounters: (TGenericPostBasic & { type: TEncounter['type'], locations: TLocation[] })[];
  scenes: (TGenericPostBasic)[];
  quests: (TGenericPostBasic & { type: TQuest['type'], locations: TLocation[] })[];
}

export type TQuestType = TOptionList

export type TQuest = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  type: TQuestType,
  parent?: TQuest,
  children?: TQuest[],
  locations?: TLocation[]
} & Completable

export type TEncounterType = TOptionList

export type TEncounter = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  type: TEncounterType
} & Completable

export type TScene = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & Completable
