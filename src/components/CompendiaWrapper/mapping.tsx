import {
  TCharacter,
  TCompendium,
  TConcept, TCurrency, TDeity, TEncounter,
  TFaction,
  TItem,
  TLanguage,
  TLocation, TNaturalResource, TPantheon, TPlane, TQuest,
  TReligion,
  TSpecies, TSpell, TStory
} from '../../types'
import { SidebarItemInterface } from '../Sidebar/Sidebar'
import {
  BookIcon,
  CatIcon,
  ChurchIcon,
  CircleIcon,
  CoinsIcon,
  FlagIcon,
  FlowerIcon,
  LanguagesIcon,
  MapPinIcon,
  PersonStandingIcon,
  StarIcon,
  SunIcon,
  SwordIcon,
  SwordsIcon,
  UserIcon,
  Wand2Icon
} from 'lucide-react'

export const mapConcept = (compendium: TCompendium, concept: TConcept): SidebarItemInterface => ({
  title: concept.name,
  to: `/compendia/${compendium?.slug}/concepts/${concept.slug}`,
  icon: (props) => <StarIcon {...props}/>,
})

export const mapSpecies = (compendium: TCompendium, species: TSpecies): SidebarItemInterface => ({
  title: species.name,
  to: `/compendia/${compendium?.slug}/species/${species.slug}`,
  icon: (props) => <CatIcon {...props}/>,
})

export const mapCharacter = (compendium: TCompendium, character: TCharacter): SidebarItemInterface => ({
  title: character.name,
  to: `/compendia/${compendium?.slug}/characters/${character.slug}`,
  icon: (props) => <UserIcon {...props}/>,
})

export const mapLocation = (compendium: TCompendium, location: TLocation): SidebarItemInterface => ({
  title: location.name,
  to: `/compendia/${compendium?.slug}/locations/${location.slug}`,
  hasChildren: location.hasSubLocations,
  // addNewLink: `/compendia/${compendium?.slug}/location/${location.slug}`, // todo add sub location
  icon: (props) => <MapPinIcon {...props}/>,
  children: location.children?.map(subLocation => mapLocation(compendium, subLocation))
})

export const mapItem = (compendium: TCompendium, item: TItem): SidebarItemInterface => ({
  title: item.name,
  to: `/compendia/${compendium?.slug}/items/${item.slug}`,
  icon: (props) => <SwordIcon {...props}/>,
})

export const mapFaction = (compendium: TCompendium, faction: TFaction): SidebarItemInterface => ({
  title: faction.name,
  to: `/compendia/${compendium?.slug}/factions/${faction.slug}`,
  icon: (props) => <FlagIcon {...props}/>,
})

export const mapLanguage = (compendium: TCompendium, language: TLanguage): SidebarItemInterface => ({
  title: language.name,
  to: `/compendia/${compendium?.slug}/languages/${language.slug}`,
  icon: (props) => <LanguagesIcon {...props}/>,
})

export const mapReligion = (compendium: TCompendium, religion: TReligion): SidebarItemInterface => ({
  title: religion.name,
  to: `/compendia/${compendium?.slug}/religions/${religion.slug}`,
  icon: (props) => <ChurchIcon {...props}/>,
})

export const mapPantheon = (compendium: TCompendium, pantheon: TPantheon): SidebarItemInterface => ({
  title: pantheon.name,
  to: `/compendia/${compendium?.slug}/pantheons/${pantheon.slug}`,
  icon: (props) => <SunIcon {...props}/>,
})

export const mapCurrency = (compendium: TCompendium, currency: TCurrency): SidebarItemInterface => ({
  title: currency.name,
  to: `/compendia/${compendium?.slug}/currencies/${currency.slug}`,
  icon: (props) => <CoinsIcon {...props}/>,
})

export const mapStory = (compendium: TCompendium, story: TStory): SidebarItemInterface => ({
  title: story.name,
  to: `/compendia/${compendium?.slug}/stories/${story.slug}`,
  icon: (props) => <BookIcon {...props}/>,
})

export const mapNaturalResource = (compendium: TCompendium, naturalResource: TNaturalResource): SidebarItemInterface => ({
  title: naturalResource.name,
  to: `/compendia/${compendium?.slug}/naturalResources/${naturalResource.slug}`,
  icon: (props) => <FlowerIcon {...props}/>,
})

export const mapPlane = (compendium: TCompendium, plane: TPlane): SidebarItemInterface => ({
  title: plane.name,
  to: `/compendia/${compendium?.slug}/planes/${plane.slug}`,
  icon: (props) => <CircleIcon {...props}/>,
})

export const mapDeity = (compendium: TCompendium, deity: TDeity): SidebarItemInterface => ({
  title: deity.name,
  to: `/compendia/${compendium?.slug}/deities/${deity.slug}`,
  icon: (props) => <PersonStandingIcon {...props}/>,
})

export const mapQuest = (compendium: TCompendium, quest: TQuest): SidebarItemInterface => ({
  title: quest.name,
  to: `/compendia/${compendium?.slug}/quests/${quest.slug}`,
  icon: (props) => <StarIcon {...props}/>,
})

export const mapSpell = (compendium: TCompendium, spell: TSpell): SidebarItemInterface => ({
  title: spell.name,
  to: `/compendia/${compendium?.slug}/spells/${spell.slug}`,
  icon: (props) => <Wand2Icon {...props}/>,
})

export const mapEncounter = (compendium: TCompendium, encounter: TEncounter): SidebarItemInterface => ({
  title: encounter.name,
  to: `/compendia/${compendium?.slug}/encounters/${encounter.slug}`,
  icon: (props) => <SwordsIcon {...props}/>,
})