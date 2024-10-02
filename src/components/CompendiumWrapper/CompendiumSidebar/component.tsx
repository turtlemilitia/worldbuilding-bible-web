import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import {
  AsteriskIcon,
  BookIcon,
  CatIcon,
  ChurchIcon,
  CircleEllipsisIcon,
  CircleIcon,
  CoinsIcon,
  FlowerIcon,
  LanguagesIcon,
  MapIcon,
  PersonStandingIcon,
  ShieldIcon,
  SunIcon,
  SwordIcon,
  WandIcon
} from 'lucide-react'
import useCompendiaMapping from '../useCompendiaMapping'
import { FunctionComponent, useMemo } from 'react'
import { TCompendiumSidebarProps } from './types'
import { createNestedArray } from '../../../utils/treeUtils'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const CompendiumSidebar: FunctionComponent<TCompendiumSidebarProps> = ({ compendium }) => {

  const nestedLocations = useMemo(() => createNestedArray(compendium.locations || []), [compendium.locations])

  // pages can be under the campaign or the compendium itself
  const { compendiumPath: prefix } = useUrlFormatter()

  const {
    mapCharacter,
    mapConcept,
    mapCurrency,
    mapDeity,
    mapFaction,
    mapItem,
    mapLanguage,
    mapLocation,
    mapNaturalResource,
    mapPantheon,
    mapPlane,
    mapReligion,
    mapSpecies,
    mapSpell,
    mapStory
  } = useCompendiaMapping({ prefix })

  const items: SidebarItemInterface[] = useMemo(() => {
    const addNewLink = (typePlural: string): string | undefined => {
      if (compendium.canUpdate) {
        return `${prefix}/${typePlural}/new`
      }
      return undefined
    }

    const items: SidebarItemInterface[] = [
      {
        title: 'Bestiary',
        addNewLink: addNewLink('species'),
        icon: (props) => <CatIcon {...props}/>,
        children: compendium.species?.map(species => mapSpecies(species))
      },
      {
        title: 'Characters',
        addNewLink: addNewLink('characters'),
        icon: (props) => <PersonStandingIcon {...props}/>,
        children: compendium.characters?.map(character => mapCharacter(character))
      },
      {
        title: 'Concepts',
        addNewLink: addNewLink('concepts'),
        icon: (props) => <CircleEllipsisIcon {...props}/>,
        children: compendium.concepts?.map(concept => mapConcept(concept))
      },
      {
        title: 'Culture',
        icon: (props) => <AsteriskIcon {...props}/>,
        children: [
          {
            title: 'Languages',
            addNewLink: addNewLink('languages'),
            icon: (props) => <LanguagesIcon {...props}/>,
            children: compendium.languages?.map(language => mapLanguage(language))
          },
          {
            title: 'Religion',
            icon: (props) => <SunIcon {...props}/>,
            children: [
              {
                title: 'Religions',
                addNewLink: addNewLink('religions'),
                icon: (props) => <ChurchIcon {...props}/>,
                children: compendium.religions?.map(currency => mapReligion(currency))
              },
              {
                title: 'Pantheons',
                addNewLink: addNewLink('pantheons'),
                icon: (props) => <SunIcon {...props}/>,
                children: compendium.pantheons?.map(pantheon => mapPantheon(pantheon))
              },
              {
                title: 'Deities',
                addNewLink: addNewLink('deities'),
                icon: (props) => <PersonStandingIcon {...props}/>,
                children: compendium.deities?.map(deity => mapDeity(deity)),
              },
            ]
          },
          {
            title: 'Currencies',
            addNewLink: addNewLink('currencies'),
            icon: (props) => <CoinsIcon {...props}/>,
            children: compendium.currencies?.map(currency => mapCurrency(currency)),
          },
        ]
      },
      {
        title: 'Factions & Societies',
        addNewLink: addNewLink('factions'),
        icon: (props) => <ShieldIcon {...props}/>,
        children: compendium.factions?.map(faction => mapFaction(faction)),
      },
      {
        title: 'Geography',
        addNewLink: addNewLink('locations'),
        icon: (props) => <MapIcon {...props}/>,
        children: nestedLocations?.map(location => mapLocation(location)),
      },
      {
        title: 'Items',
        addNewLink: addNewLink('items'),
        icon: (props) => <SwordIcon {...props}/>,
        children: compendium.items?.map(item => mapItem(item)),
      },
      {
        title: 'Natural Resources',
        addNewLink: addNewLink('natural-resources'),
        icon: (props) => <FlowerIcon {...props}/>,
        children: compendium.naturalResources?.map(naturalResource => mapNaturalResource(naturalResource)),
      },
      {
        title: 'Planes',
        addNewLink: addNewLink('planes'),
        icon: (props) => <CircleIcon {...props}/>,
        children: compendium.planes?.map(plane => mapPlane(plane)),
      },
      {
        title: 'Lore & History',
        addNewLink: addNewLink('stories'),
        icon: (props) => <BookIcon {...props}/>,
        children: compendium.stories?.map(story => mapStory(story)),
      },
      {
        title: 'Spells',
        addNewLink: addNewLink('spells'),
        icon: (props) => <WandIcon {...props}/>,
        children: compendium.spells?.map(spell => mapSpell(spell)),
      }
    ]

    return items.map(item => ({ ...item, startOpen: false }))
  }, [compendium.species, mapSpecies, compendium.characters, mapCharacter, compendium.concepts, mapConcept, compendium.languages, mapLanguage, compendium.religions, mapReligion, compendium.pantheons, mapPantheon, compendium.deities, mapDeity, compendium.currencies, mapCurrency, compendium.factions, mapFaction, nestedLocations, mapLocation, compendium.items, mapItem, compendium.naturalResources, mapNaturalResource, compendium.planes, mapPlane, compendium.stories, mapStory, compendium.spells, mapSpell, compendium.canUpdate, prefix])

  return <Sidebar title={'Compendium'} items={items}/>
}

export default CompendiumSidebar