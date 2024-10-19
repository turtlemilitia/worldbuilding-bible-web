import {
  TCanHaveImages,
  TCanHaveNotes,
  TGenericPost,
  TGenericPostBasic,
  TInvitation, TOptionList,
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
  encounters: (TGenericPostBasic & { type: TEncounter['type'] })[];
  scenes: (TGenericPostBasic)[];
  quests: (TGenericPostBasic & { type: TQuest['type'] })[];
}

export type TQuestType = TOptionList

export type TQuest = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  type: TQuestType,
  parent?: TQuest,
  children?: TQuest[]
}

export type TEncounterType = TOptionList

export type TEncounter = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  type: TEncounterType
}

export type TScene = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes
