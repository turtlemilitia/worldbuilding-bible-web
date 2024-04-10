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
import { indexSpecies } from '../../../services/SpeciesService'
import { updateCompendiumData } from '../../../reducers/compendium/compendiumSlice'
import { indexCharacters } from '../../../services/CharacterService'
import { indexConcepts } from '../../../services/ConceptService'
import { indexLanguages } from '../../../services/LanguageService'
import { indexReligions } from '../../../services/ReligionService'
import { indexPantheons } from '../../../services/PantheonService'
import { indexDeities } from '../../../services/DeityService'
import { indexCurrencies } from '../../../services/CurrencyService'
import { indexFactions } from '../../../services/FactionService'
import { indexLocations } from '../../../services/LocationService'
import { indexItems } from '../../../services/ItemService'
import { indexNaturalResources } from '../../../services/NaturalResourceService'
import { indexPlanes } from '../../../services/PlaneService'
import { indexStories } from '../../../services/StoryService'
import useCompendiaMapping from '../useCompendiaMapping'
import { FunctionComponent, useCallback, useMemo } from 'react'
import { TCompendiumSidebarProps } from './types'
import { createNestedArray } from '../../../utils/treeUtils'
import { useAppDispatch } from '../../../hooks'
import { useParams } from 'react-router-dom'

const CompendiumSidebar: FunctionComponent<TCompendiumSidebarProps> = ({ compendium }) => {

  const dispatch = useAppDispatch()

  const nestedLocations = useMemo(() => createNestedArray(compendium.locations || []), [compendium.locations])

  const { campaignId, compendiumId } = useParams()

  // pages can be under the campaign or the compendium itself
  const prefix = `${ campaignId ? `/campaigns/${campaignId}` : '' }/compendia/${compendiumId}`

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

  const addNewLink = useCallback((typePlural: string): string|undefined => {
    if (compendium.canUpdate) {
      return `${prefix}/${typePlural}/new`
    }
    return undefined
  }, [compendium.canUpdate])

  const items: SidebarItemInterface[] = [
    {
      title: 'Bestiary',
      addNewLink: addNewLink('species'),
      icon: (props) => <CatIcon {...props}/>,
      children: compendium.species?.map(species => mapSpecies(species)),
      loadChildren: () => {
        indexSpecies(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ species: data.data }))
          })
      }
    },
    {
      title: 'Characters',
      addNewLink: addNewLink('characters'),
      icon: (props) => <PersonStandingIcon {...props}/>,
      children: compendium.characters?.map(character => mapCharacter(character)),
      loadChildren: () => {
        indexCharacters(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ characters: data.data }))
          })
      }
    },
    {
      title: 'Concepts',
      addNewLink: addNewLink('concepts'),
      icon: (props) => <CircleEllipsisIcon {...props}/>,
      children: compendium.concepts?.map(concept => mapConcept(concept)),
      loadChildren: () => {
        indexConcepts(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ concepts: data.data }))
          })
      }
    },
    {
      title: 'Culture',
      icon: (props) => <AsteriskIcon {...props}/>,
      children: [
        {
          title: 'Languages',
          addNewLink: addNewLink('languages'),
          icon: (props) => <LanguagesIcon {...props}/>,
          children: compendium.languages?.map(language => mapLanguage(language)),
          loadChildren: () => {
            indexLanguages(compendium.slug)
              .then(({ data }) => {
                dispatch(updateCompendiumData({ languages: data.data }))
              })
          }
        },
        {
          title: 'Religion',
          icon: (props) => <SunIcon {...props}/>,
          children: [
            {
              title: 'Religions',
              addNewLink: addNewLink('religions'),
              icon: (props) => <ChurchIcon {...props}/>,
              children: compendium.religions?.map(currency => mapReligion(currency)),
              loadChildren: () => {
                indexReligions(compendium.slug)
                  .then(({ data }) => {
                    dispatch(updateCompendiumData({ religions: data.data }))
                  })
              }
            },
            {
              title: 'Pantheons',
              addNewLink: addNewLink('pantheons'),
              icon: (props) => <SunIcon {...props}/>,
              children: compendium.pantheons?.map(pantheon => mapPantheon(pantheon)),
              loadChildren: () => {
                indexPantheons(compendium.slug)
                  .then(({ data }) => {
                    dispatch(updateCompendiumData({ pantheons: data.data }))
                  })
              }
            },
            {
              title: 'Deities',
              addNewLink: addNewLink('deities'),
              icon: (props) => <PersonStandingIcon {...props}/>,
              children: compendium.deities?.map(deity => mapDeity(deity)),
              loadChildren: () => {
                indexDeities(compendium.slug)
                  .then(({ data }) => {
                    dispatch(updateCompendiumData({ deities: data.data }))
                  })
              }
            },
          ]
        },
        {
          title: 'Currencies',
          addNewLink: addNewLink('currencies'),
          icon: (props) => <CoinsIcon {...props}/>,
          children: compendium.currencies?.map(currency => mapCurrency(currency)),
          loadChildren: () => {
            indexCurrencies(compendium.slug)
              .then(({ data }) => {
                dispatch(updateCompendiumData({ currencies: data.data }))
              })
          }
        },
      ]
    },
    {
      title: 'Factions & Societies',
      addNewLink: addNewLink('factions'),
      icon: (props) => <ShieldIcon {...props}/>,
      children: compendium.factions?.map(faction => mapFaction(faction)),
      loadChildren: () => {
        indexFactions(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ factions: data.data }))
          })
      }
    },
    {
      title: 'Geography',
      addNewLink: addNewLink('locations'),
      icon: (props) => <MapIcon {...props}/>,
      children: nestedLocations?.map(location => mapLocation(location)),
      loadChildren: () => {
        indexLocations(compendium.slug, { include: 'parent' })
          .then(({ data }) => {
            dispatch(updateCompendiumData({ locations: data.data }))
          })
      }
    },
    {
      title: 'Items',
      addNewLink: addNewLink('items'),
      icon: (props) => <SwordIcon {...props}/>,
      children: compendium.items?.map(item => mapItem(item)),
      loadChildren: () => {
        indexItems(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ items: data.data }))
          })
      }
    },
    {
      title: 'Natural Resources',
      addNewLink: addNewLink('naturalResources'),
      icon: (props) => <FlowerIcon {...props}/>,
      children: compendium.naturalResources?.map(naturalResource => mapNaturalResource(naturalResource)),
      loadChildren: () => {
        indexNaturalResources(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ naturalResources: data.data }))
          })
      }
    },
    {
      title: 'Planes',
      addNewLink: addNewLink('planes'),
      icon: (props) => <CircleIcon {...props}/>,
      children: compendium.planes?.map(plane => mapPlane(plane)),
      loadChildren: () => {
        indexPlanes(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ planes: data.data }))
          })
      }
    },
    {
      title: 'Lore & History',
      addNewLink: addNewLink('stories'),
      icon: (props) => <BookIcon {...props}/>,
      children: compendium.stories?.map(story => mapStory(story)),
      loadChildren: () => {
        indexStories(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ stories: data.data }))
          })
      }
    },
    {
      title: 'Spells',
      addNewLink: addNewLink('spells'),
      icon: (props) => <WandIcon {...props}/>,
      children: compendium.spells?.map(spell => mapSpell(spell)),
      loadChildren: () => {
        indexStories(compendium.slug)
          .then(({ data }) => {
            dispatch(updateCompendiumData({ spells: data.data }))
          })
      }
    }
  ]

  return <Sidebar title={'Compendium'} items={items}/>
}

export default CompendiumSidebar