import {
  TCharacter,
  TConcept,
  TCurrency,
  TDeity,
  TEncounter,
  TFaction,
  TItem,
  TLanguage,
  TLocation,
  TNaturalResource,
  TPantheon,
  TPlane,
  TQuest,
  TReligion,
  TSpecies,
  TSpell,
  TStory,
  TTypesAllowed
} from '../../../types'
import { SidebarItemInterface } from '../../Sidebar/Sidebar'
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
import { destroyConcept } from '../../../services/ConceptService'
import { TUseCompendiaMapping } from './types'
import { removeCompendiumChildData } from '../../../reducers/compendium/compendiumSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { destroyCharacter } from '../../../services/CharacterService'
import { destroySpecies } from '../../../services/SpeciesService'
import { destroyLocation } from '../../../services/LocationService'
import { destroyItem } from '../../../services/ItemService'
import { destroyFaction } from '../../../services/FactionService'
import { destroyLanguage } from '../../../services/LanguageService'
import { destroyReligion } from '../../../services/ReligionService'
import { destroyPantheon } from '../../../services/PantheonService'
import { destroyCurrency } from '../../../services/CurrencyService'
import { destroyStory } from '../../../services/StoryService'
import { destroyNaturalResource } from '../../../services/NaturalResourceService'
import { destroyPlane } from '../../../services/PlaneService'
import { destroyDeity } from '../../../services/DeityService'
import { destroyQuest } from '../../../services/QuestService'
import { destroySpell } from '../../../services/SpellService'
import { destroyEncounter } from '../../../services/EncounterService'
import { useAppDispatch } from '../../../hooks'

const useCompendiaMapping: TUseCompendiaMapping = ({ prefix }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const location = useLocation()

  const onDeleted = (field: string, slug: TTypesAllowed['slug']) => {
    dispatch(removeCompendiumChildData({ field, id: slug }))
    if (location.pathname.includes(`${prefix}/${field}/${slug}`)) {
      navigate(`${prefix}`)
    }
  }

  const mapConcept = (concept: TConcept): SidebarItemInterface => ({
    title: concept.name,
    to: `${prefix}/concepts/${concept.slug}`,
    icon: (props) => <StarIcon {...props}/>,
    onDelete: () => destroyConcept(concept.slug)
      .then(() => onDeleted('concepts', concept.slug))
  })

  const mapSpecies = (species: TSpecies): SidebarItemInterface => ({
    title: species.name,
    to: `${prefix}/species/${species.slug}`,
    icon: (props) => <CatIcon {...props}/>,
    onDelete: () => destroySpecies(species.slug)
      .then(() => onDeleted('species', species.slug))
  })

  const mapCharacter = (character: TCharacter): SidebarItemInterface => ({
    title: character.name,
    to: `${prefix}/characters/${character.slug}`,
    icon: (props) => <UserIcon {...props}/>,
    onDelete: () => destroyCharacter(character.slug)
      .then(() => onDeleted('characters', character.slug))
  })

  const mapLocation = (location: TLocation): SidebarItemInterface => ({
    title: location.name,
    to: `${prefix}/locations/${location.slug}`,
    icon: (props) => <MapPinIcon {...props}/>,
    addNewLink: `${prefix}/locations/new`,
    addNewLinkState: { parent: location },
    onDelete: () => destroyLocation(location.slug)
      .then(() => onDeleted('locations', location.slug)),
    hasChildren: location.hasSubLocations,
    children: location.children?.map(subLocation => mapLocation(subLocation))
  })

  const mapItem = (item: TItem): SidebarItemInterface => ({
    title: item.name,
    to: `${prefix}/items/${item.slug}`,
    icon: (props) => <SwordIcon {...props}/>,
    onDelete: () => destroyItem(item.slug)
      .then(() => onDeleted('items', item.slug))
  })

  const mapFaction = (faction: TFaction): SidebarItemInterface => ({
    title: faction.name,
    to: `${prefix}/factions/${faction.slug}`,
    icon: (props) => <FlagIcon {...props}/>,
    onDelete: () => destroyFaction(faction.slug)
      .then(() => onDeleted('factions', faction.slug))
  })

  const mapLanguage = (language: TLanguage): SidebarItemInterface => ({
    title: language.name,
    to: `${prefix}/languages/${language.slug}`,
    icon: (props) => <LanguagesIcon {...props}/>,
    onDelete: () => destroyLanguage(language.slug)
      .then(() => onDeleted('languages', language.slug))
  })

  const mapReligion = (religion: TReligion): SidebarItemInterface => ({
    title: religion.name,
    to: `${prefix}/religions/${religion.slug}`,
    icon: (props) => <ChurchIcon {...props}/>,
    onDelete: () => destroyReligion(religion.slug)
      .then(() => onDeleted('religions', religion.slug))
  })

  const mapPantheon = (pantheon: TPantheon): SidebarItemInterface => ({
    title: pantheon.name,
    to: `${prefix}/pantheons/${pantheon.slug}`,
    icon: (props) => <SunIcon {...props}/>,
    onDelete: () => destroyPantheon(pantheon.slug)
      .then(() => onDeleted('pantheons', pantheon.slug))
  })

  const mapCurrency = (currency: TCurrency): SidebarItemInterface => ({
    title: currency.name,
    to: `${prefix}/currencies/${currency.slug}`,
    icon: (props) => <CoinsIcon {...props}/>,
    onDelete: () => destroyCurrency(currency.slug)
      .then(() => onDeleted('currencies', currency.slug))
  })

  const mapStory = (story: TStory): SidebarItemInterface => ({
    title: story.name,
    to: `${prefix}/stories/${story.slug}`,
    icon: (props) => <BookIcon {...props}/>,
    onDelete: () => destroyStory(story.slug)
      .then(() => onDeleted('stories', story.slug))
  })

  const mapNaturalResource = (naturalResource: TNaturalResource): SidebarItemInterface => ({
    title: naturalResource.name,
    to: `${prefix}/natural-resources/${naturalResource.slug}`,
    icon: (props) => <FlowerIcon {...props}/>,
    onDelete: () => destroyNaturalResource(naturalResource.slug)
      .then(() => onDeleted('naturalResources', naturalResource.slug))
  })

  const mapPlane = (plane: TPlane): SidebarItemInterface => ({
    title: plane.name,
    to: `${prefix}/planes/${plane.slug}`,
    icon: (props) => <CircleIcon {...props}/>,
    onDelete: () => destroyPlane(plane.slug)
      .then(() => onDeleted('planes', plane.slug))
  })

  const mapDeity = (deity: TDeity): SidebarItemInterface => ({
    title: deity.name,
    to: `${prefix}/deities/${deity.slug}`,
    icon: (props) => <PersonStandingIcon {...props}/>,
    onDelete: () => destroyDeity(deity.slug)
      .then(() => onDeleted('deities', deity.slug))
  })

  const mapQuest = (quest: TQuest): SidebarItemInterface => ({
    title: quest.name,
    to: `${prefix}/quests/${quest.slug}`,
    icon: (props) => <StarIcon {...props}/>,
    onDelete: () => destroyQuest(quest.slug)
      .then(() => onDeleted('quests', quest.slug))
  })

  const mapSpell = (spell: TSpell): SidebarItemInterface => ({
    title: spell.name,
    to: `${prefix}/spells/${spell.slug}`,
    icon: (props) => <Wand2Icon {...props}/>,
    onDelete: () => destroySpell(spell.slug)
      .then(() => onDeleted('spells', spell.slug))
  })

  const mapEncounter = (encounter: TEncounter): SidebarItemInterface => ({
    title: encounter.name,
    to: `${prefix}/encounters/${encounter.slug}`,
    icon: (props) => <SwordsIcon {...props}/>,
    onDelete: () => destroyEncounter(encounter.slug)
      .then(() => onDeleted('encounters', encounter.slug))
  })

  return {
    mapConcept,
    mapSpecies,
    mapCharacter,
    mapLocation,
    mapItem,
    mapFaction,
    mapLanguage,
    mapReligion,
    mapPantheon,
    mapCurrency,
    mapStory,
    mapNaturalResource,
    mapPlane,
    mapDeity,
    mapQuest,
    mapSpell,
    mapEncounter,
  }
}

export default useCompendiaMapping