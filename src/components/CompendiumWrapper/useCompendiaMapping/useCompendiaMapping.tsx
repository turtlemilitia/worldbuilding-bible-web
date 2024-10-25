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
  TTypesAllowed
} from '@/types'
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
  UserIcon,
  Wand2Icon
} from 'lucide-react'
import { TUseCompendiaMappingProps } from './types'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import {
  useCharacterDataManager,
  useConceptDataManager,
  useCurrencyDataManager,
  useDeityDataManager,
  useFactionDataManager,
  useItemDataManager,
  useLanguageDataManager,
  useLocationDataManager,
  useNaturalResourceDataManager,
  usePantheonDataManager,
  usePlaneDataManager,
  useReligionDataManager,
  useSpeciesDataManager,
  useSpellDataManager,
  useStoryDataManager
} from '@/hooks/DataManagers'

const useCompendiaMapping = ({ prefix }: TUseCompendiaMappingProps) => {

  const navigate = useNavigate()

  const location = useLocation()

  const { destroy: destroyConcept } = useConceptDataManager()
  const { destroy: destroySpecies } = useSpeciesDataManager()
  const { destroy: destroyCharacter } = useCharacterDataManager()
  const { destroy: destroyLocation } = useLocationDataManager()
  const { destroy: destroyItem } = useItemDataManager()
  const { destroy: destroyFaction } = useFactionDataManager()
  const { destroy: destroyLanguage } = useLanguageDataManager()
  const { destroy: destroyReligion } = useReligionDataManager()
  const { destroy: destroyPantheon } = usePantheonDataManager()
  const { destroy: destroyCurrency } = useCurrencyDataManager()
  const { destroy: destroyStory } = useStoryDataManager()
  const { destroy: destroyNaturalResource } = useNaturalResourceDataManager()
  const { destroy: destroyPlane } = usePlaneDataManager()
  const { destroy: destroyDeity } = useDeityDataManager()
  const { destroy: destroySpell } = useSpellDataManager()

  const onDeleted = (field: string, slug: TTypesAllowed['slug']) => {
    if (location.pathname.includes(`${prefix}/${field}/${slug}`)) {
      navigate(`${prefix}`)
    }
  }

  const mapConcept = (concept: TConcept): SidebarItemInterface => ({
    title: concept.name,
    to: `${prefix}/concepts/${concept.slug}`,
    icon: (props) => <StarIcon {...props}/>,
    onDelete: concept.canDelete ? () => destroyConcept(concept.slug)
      .then(() => onDeleted('concepts', concept.slug)) : undefined
  })

  const mapSpecies = (species: TSpecies): SidebarItemInterface => ({
    title: species.name,
    to: `${prefix}/species/${species.slug}`,
    icon: (props) => <CatIcon {...props}/>,
    onDelete: species.canDelete ? () => destroySpecies(species.slug)
      .then(() => onDeleted('species', species.slug)) : undefined
  })

  const mapCharacter = (character: TCharacter): SidebarItemInterface => ({
    title: character.name,
    to: `${prefix}/characters/${character.slug}`,
    icon: (props) => <UserIcon {...props}/>,
    onDelete: character.canDelete ? () => destroyCharacter(character.slug)
      .then(() => onDeleted('characters', character.slug)) : undefined
  })

  const mapLocation = (location: TLocation): SidebarItemInterface => ({
    title: location.name,
    to: `${prefix}/locations/${location.slug}`,
    icon: (props) => <MapPinIcon {...props}/>,
    addNewLink: location.canUpdate ? `${prefix}/locations/new` : '',
    addNewLinkState: { parent: location },
    onDelete: location.canDelete ? () => destroyLocation(location.slug)
      .then(() => onDeleted('locations', location.slug)) : undefined,
    hasChildren: location.hasSubLocations,
    children: location.children?.map(subLocation => mapLocation(subLocation))
  })

  const mapItem = (item: TItem): SidebarItemInterface => ({
    title: item.name,
    to: `${prefix}/items/${item.slug}`,
    icon: (props) => <SwordIcon {...props}/>,
    onDelete: item.canDelete ? () => destroyItem(item.slug)
      .then(() => onDeleted('items', item.slug)) : undefined
  })

  const mapFaction = (faction: TFaction): SidebarItemInterface => ({
    title: faction.name,
    to: `${prefix}/factions/${faction.slug}`,
    icon: (props) => <FlagIcon {...props}/>,
    onDelete: faction.canDelete ? () => destroyFaction(faction.slug)
      .then(() => onDeleted('factions', faction.slug)) : undefined
  })

  const mapLanguage = (language: TLanguage): SidebarItemInterface => ({
    title: language.name,
    to: `${prefix}/languages/${language.slug}`,
    icon: (props) => <LanguagesIcon {...props}/>,
    onDelete: language.canDelete ? () => destroyLanguage(language.slug)
      .then(() => onDeleted('languages', language.slug)) : undefined
  })

  const mapReligion = (religion: TReligion): SidebarItemInterface => ({
    title: religion.name,
    to: `${prefix}/religions/${religion.slug}`,
    icon: (props) => <ChurchIcon {...props}/>,
    onDelete: religion.canDelete ? () => destroyReligion(religion.slug)
      .then(() => onDeleted('religions', religion.slug)) : undefined
  })

  const mapPantheon = (pantheon: TPantheon): SidebarItemInterface => ({
    title: pantheon.name,
    subtitle: pantheon.religion?.name,
    to: `${prefix}/pantheons/${pantheon.slug}`,
    icon: (props) => <SunIcon {...props}/>,
    onDelete: pantheon.canDelete ? () => destroyPantheon(pantheon.slug)
      .then(() => onDeleted('pantheons', pantheon.slug)) : undefined
  })

  const mapCurrency = (currency: TCurrency): SidebarItemInterface => ({
    title: currency.name,
    to: `${prefix}/currencies/${currency.slug}`,
    icon: (props) => <CoinsIcon {...props}/>,
    onDelete: currency.canDelete ? () => destroyCurrency(currency.slug)
      .then(() => onDeleted('currencies', currency.slug)) : undefined
  })

  const mapStory = (story: TStory): SidebarItemInterface => ({
    title: story.name,
    to: `${prefix}/stories/${story.slug}`,
    icon: (props) => <BookIcon {...props}/>,
    onDelete: story.canDelete ? () => destroyStory(story.slug)
      .then(() => onDeleted('stories', story.slug)) : undefined
  })

  const mapNaturalResource = (naturalResource: TNaturalResource): SidebarItemInterface => ({
    title: naturalResource.name,
    to: `${prefix}/natural-resources/${naturalResource.slug}`,
    icon: (props) => <FlowerIcon {...props}/>,
    onDelete: naturalResource.canDelete ? () => destroyNaturalResource(naturalResource.slug)
      .then(() => onDeleted('naturalResources', naturalResource.slug)) : undefined
  })

  const mapPlane = (plane: TPlane): SidebarItemInterface => ({
    title: plane.name,
    to: `${prefix}/planes/${plane.slug}`,
    icon: (props) => <CircleIcon {...props}/>,
    onDelete: plane.canDelete ? () => destroyPlane(plane.slug)
      .then(() => onDeleted('planes', plane.slug)) : undefined
  })

  const mapDeity = (deity: TDeity): SidebarItemInterface => ({
    title: deity.name,
    subtitle: deity.pantheon?.name,
    to: `${prefix}/deities/${deity.slug}`,
    icon: (props) => <PersonStandingIcon {...props}/>,
    onDelete: deity.canDelete ? () => destroyDeity(deity.slug)
      .then(() => onDeleted('deities', deity.slug)) : undefined
  })

  const mapSpell = (spell: TSpell): SidebarItemInterface => ({
    title: spell.name,
    to: `${prefix}/spells/${spell.slug}`,
    icon: (props) => <Wand2Icon {...props}/>,
    onDelete: spell.canDelete ? () => destroySpell(spell.slug)
      .then(() => onDeleted('spells', spell.slug)) : undefined
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
    mapSpell,
  }
}

export default useCompendiaMapping