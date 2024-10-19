import {
  TCharacter,
  TConcept,
  TCurrency,
  TDeity, TEncounter,
  TFaction,
  TItem,
  TLanguage,
  TLocation,
  TNaturalResource,
  TPantheon,
  TPlane, TQuest,
  TReligion, TSession,
  TSpecies, TStory,
} from '@/types'

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