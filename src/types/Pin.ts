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
  pinnableType: 'concept'
  pinnable: TConcept
} | {
  pinnableType: 'currency'
  pinnable: TCurrency
} | {
  pinnableType: 'deity'
  pinnable: TDeity
} | {
  pinnableType: 'faction'
  pinnable: TFaction
} | {
  pinnableType: 'item'
  pinnable: TItem
} | {
  pinnableType: 'language'
  pinnable: TLanguage
} | {
  pinnableType: 'location'
  pinnable: TLocation
} | {
  pinnableType: 'naturalResource'
  pinnable: TNaturalResource
} | {
  pinnableType: 'pantheon'
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