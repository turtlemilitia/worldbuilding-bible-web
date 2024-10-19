import {
  TCharacter,
  TConcept,
  TCurrency,
  TDeity,
  TFaction,
  TItem,
  TLanguage,
  TLocation,
  TNaturalResource,
  TPantheon,
  TPlane,
  TReligion,
  TSpecies,
  TSpell,
  TStory,
} from '@/types/Compendium'
import { Identifiable } from '@/types/Generic'
import { TEncounter, TQuest } from '@/types/Campaign'
import { TSession } from '@/types/Session'

export type TFavourite = Identifiable & ({
  favouritableType: 'character'
  favouritable: TCharacter
} | {
  favouritableType: 'concept'
  favouritable: TConcept
} | {
  favouritableType: 'currency'
  favouritable: TCurrency
} | {
  favouritableType: 'deity'
  favouritable: TDeity
} | {
  favouritableType: 'faction'
  favouritable: TFaction
} | {
  favouritableType: 'item'
  favouritable: TItem
} | {
  favouritableType: 'language'
  favouritable: TLanguage
} | {
  favouritableType: 'location'
  favouritable: TLocation
} | {
  favouritableType: 'naturalResource'
  favouritable: TNaturalResource
} | {
  favouritableType: 'pantheon'
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
  favouritable: TSpell
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