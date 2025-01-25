import {
  Identifiable, Sluggable,
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
  TTypesAllowed,
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
import { makeLink } from '@/hooks/useLink'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

const useCompendiaMapping = ({ prefix }: TUseCompendiaMappingProps) => {

  const navigate = useNavigate()

  const location = useLocation()

  const { compendium } = useCurrentCompendium();

  const { destroy: destroyConcept } = useConceptDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroySpecies } = useSpeciesDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyCharacter } = useCharacterDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyLocation } = useLocationDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyItem } = useItemDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyFaction } = useFactionDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyLanguage } = useLanguageDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyReligion } = useReligionDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyPantheon } = usePantheonDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyCurrency } = useCurrencyDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyStory } = useStoryDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyNaturalResource } = useNaturalResourceDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyPlane } = usePlaneDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroyDeity } = useDeityDataManager(compendium?.id) // todo make other function to handle this type of thing
  const { destroy: destroySpell } = useSpellDataManager(compendium?.id) // todo make other function to handle this type of thing

  const onDeleted = (field: string, entity: Identifiable & Sluggable) => {
    if (location.pathname.includes(`${prefix}/${field}/${entity.id}/${entity.slug}`)) {
      navigate(`${prefix}`)
    }
  }

  const mapConcept = (concept: TConcept): SidebarItemInterface => ({
    title: concept.name,
    to: makeLink('concepts', concept.id, concept.slug, prefix),
    icon: (props) => <StarIcon {...props}/>,
    onDelete: concept.canDelete ? () => destroyConcept(concept.id)
      .then(() => onDeleted('concepts', concept)) : undefined
  })

  const mapSpecies = (species: TSpecies): SidebarItemInterface => ({
    title: species.name,
    to: makeLink('species', species.id, species.slug, prefix),
    icon: (props) => <CatIcon {...props}/>,
    onDelete: species.canDelete ? () => destroySpecies(species.id)
      .then(() => onDeleted('species', species)) : undefined
  })

  const mapCharacter = (character: TCharacter): SidebarItemInterface => ({
    title: character.name,
    to: makeLink('characters', character.id, character.slug, prefix),
    icon: (props) => <UserIcon {...props}/>,
    onDelete: character.canDelete ? () => destroyCharacter(character.id)
      .then(() => onDeleted('characters', character)) : undefined
  })

  const mapLocation = (location: TLocation): SidebarItemInterface => ({
    title: location.name,
    to: makeLink('locations', location.id, location.slug, prefix),
    icon: (props) => <MapPinIcon {...props}/>,
    addNewLink: location.canUpdate ? `${prefix}/locations/new` : '',
    addNewLinkState: { parent: location },
    onDelete: location.canDelete ? () => destroyLocation(location.id)
      .then(() => onDeleted('locations', location)) : undefined,
    hasChildren: location.hasSubLocations,
    children: location.children?.map(subLocation => mapLocation(subLocation))
  })

  const mapItem = (item: TItem): SidebarItemInterface => ({
    title: item.name,
    to: makeLink('items', item.id, item.slug, prefix),
    icon: (props) => <SwordIcon {...props}/>,
    onDelete: item.canDelete ? () => destroyItem(item.id)
      .then(() => onDeleted('items', item)) : undefined
  })

  const mapFaction = (faction: TFaction): SidebarItemInterface => ({
    title: faction.name,
    to: makeLink('factions', faction.id, faction.slug, prefix),
    icon: (props) => <FlagIcon {...props}/>,
    onDelete: faction.canDelete ? () => destroyFaction(faction.id)
      .then(() => onDeleted('factions', faction)) : undefined
  })

  const mapLanguage = (language: TLanguage): SidebarItemInterface => ({
    title: language.name,
    to: makeLink('languages', language.id, language.slug, prefix),
    icon: (props) => <LanguagesIcon {...props}/>,
    onDelete: language.canDelete ? () => destroyLanguage(language.id)
      .then(() => onDeleted('languages', language)) : undefined
  })

  const mapReligion = (religion: TReligion): SidebarItemInterface => ({
    title: religion.name,
    to: makeLink('religions', religion.id, religion.slug, prefix),
    icon: (props) => <ChurchIcon {...props}/>,
    onDelete: religion.canDelete ? () => destroyReligion(religion.id)
      .then(() => onDeleted('religions', religion)) : undefined
  })

  const mapPantheon = (pantheon: TPantheon): SidebarItemInterface => ({
    title: pantheon.name,
    subtitle: pantheon.religion?.name,
    to: makeLink('pantheons', pantheon.id, pantheon.slug, prefix),
    icon: (props) => <SunIcon {...props}/>,
    onDelete: pantheon.canDelete ? () => destroyPantheon(pantheon.id)
      .then(() => onDeleted('pantheons', pantheon)) : undefined
  })

  const mapCurrency = (currency: TCurrency): SidebarItemInterface => ({
    title: currency.name,
    to: makeLink('currencies', currency.id, currency.slug, prefix),
    icon: (props) => <CoinsIcon {...props}/>,
    onDelete: currency.canDelete ? () => destroyCurrency(currency.id)
      .then(() => onDeleted('currencies', currency)) : undefined
  })

  const mapStory = (story: TStory): SidebarItemInterface => ({
    title: story.name,
    to: makeLink('stories', story.id, story.slug, prefix),
    icon: (props) => <BookIcon {...props}/>,
    onDelete: story.canDelete ? () => destroyStory(story.id)
      .then(() => onDeleted('stories', story)) : undefined
  })

  const mapNaturalResource = (naturalResource: TNaturalResource): SidebarItemInterface => ({
    title: naturalResource.name,
    to: makeLink('natural-resources', naturalResource.id, naturalResource.slug, prefix),
    icon: (props) => <FlowerIcon {...props}/>,
    onDelete: naturalResource.canDelete ? () => destroyNaturalResource(naturalResource.id)
      .then(() => onDeleted('naturalResources', naturalResource)) : undefined
  })

  const mapPlane = (plane: TPlane): SidebarItemInterface => ({
    title: plane.name,
    to: makeLink('planes', plane.id, plane.slug, prefix),
    icon: (props) => <CircleIcon {...props}/>,
    onDelete: plane.canDelete ? () => destroyPlane(plane.id)
      .then(() => onDeleted('planes', plane)) : undefined
  })

  const mapDeity = (deity: TDeity): SidebarItemInterface => ({
    title: deity.name,
    subtitle: deity.pantheon?.name,
    to: makeLink('deities', deity.id, deity.slug, prefix),
    icon: (props) => <PersonStandingIcon {...props}/>,
    onDelete: deity.canDelete ? () => destroyDeity(deity.id)
      .then(() => onDeleted('deities', deity)) : undefined
  })

  const mapSpell = (spell: TSpell): SidebarItemInterface => ({
    title: spell.name,
    to: makeLink('spells', spell.id, spell.slug, prefix),
    icon: (props) => <Wand2Icon {...props}/>,
    onDelete: spell.canDelete ? () => destroySpell(spell.id)
      .then(() => onDeleted('spells', spell)) : undefined
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