import { JSX, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import {
  AsteriskIcon,
  BookIcon,
  CatIcon,
  ChurchIcon,
  CircleEllipsisIcon, CircleIcon,
  CoinsIcon,
  FlagIcon,
  FlowerIcon,
  LanguagesIcon,
  MapIcon,
  MapPinIcon,
  PersonStandingIcon,
  ShieldIcon,
  StarIcon, SunIcon,
  SwordIcon,
  UserIcon
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import {
  TCompendium,
  TLocation,
  TCharacter,
  TSpecies,
  TItem,
  TConcept,
  TFaction,
  TLanguage,
  TReligion,
  TPantheon,
  TCurrency,
  TStory,
  TNaturalResource,
  TPlane
} from '../../types'
import { indexLocations } from '../../services/LocationService'
import { clearCompendiumData, setCompendiumData, updateCompendiumData } from '../../reducers/compendium/compendiumSlice'
import { createNestedArray } from '../../utils/treeUtils'
import { indexCharacters } from '../../services/CharacterService'
import { indexSpecies } from '../../services/SpeciesService'
import { indexItems } from '../../services/ItemService'
import { indexFactions } from '../../services/FactionService'
import { indexLanguages } from '../../services/LanguageService'
import { indexConcepts } from '../../services/ConceptService'
import { indexReligions } from '../../services/ReligionService'
import { indexCurrencies } from '../../services/CurrencyService'
import { indexPantheons } from '../../services/PantheonService'
import { indexStories } from '../../services/StoryService'
import { indexNaturalResources } from '../../services/NaturalResourceService'
import { indexPlanes } from '../../services/PlaneService'
import { viewCompendium } from '../../services/CompendiumService'
import LoadingWrapper from '../../components/LoadingWrapper'


const mapConcept = (compendium: TCompendium, concept: TConcept): SidebarItemInterface => ({
  title: concept.name,
  to: `/compendia/${compendium?.slug}/concepts/${concept.slug}`,
  icon: (props) => <StarIcon {...props}/>,
})

const mapSpecies = (compendium: TCompendium, species: TSpecies): SidebarItemInterface => ({
  title: species.name,
  to: `/compendia/${compendium?.slug}/species/${species.slug}`,
  icon: (props) => <CatIcon {...props}/>,
})

const mapCharacter = (compendium: TCompendium, character: TCharacter): SidebarItemInterface => ({
  title: character.name,
  to: `/compendia/${compendium?.slug}/characters/${character.slug}`,
  icon: (props) => <UserIcon {...props}/>,
})

const mapLocation = (compendium: TCompendium, location: TLocation): SidebarItemInterface => ({
  title: location.name,
  to: `/compendia/${compendium?.slug}/locations/${location.slug}`,
  hasChildren: location.hasSubLocations,
  // addNewLink: `/compendia/${compendium?.slug}/location/${location.slug}`, // todo add sub location
  icon: (props) => <MapPinIcon {...props}/>,
  children: location.children?.map(subLocation => mapLocation(compendium, subLocation))
})

const mapItem = (compendium: TCompendium, item: TItem): SidebarItemInterface => ({
  title: item.name,
  to: `/compendia/${compendium?.slug}/items/${item.slug}`,
  icon: (props) => <SwordIcon {...props}/>,
})

const mapFaction = (compendium: TCompendium, faction: TFaction): SidebarItemInterface => ({
  title: faction.name,
  to: `/compendia/${compendium?.slug}/factions/${faction.slug}`,
  icon: (props) => <FlagIcon {...props}/>,
})

const mapLanguage = (compendium: TCompendium, language: TLanguage): SidebarItemInterface => ({
  title: language.name,
  to: `/compendia/${compendium?.slug}/languages/${language.slug}`,
  icon: (props) => <LanguagesIcon {...props}/>,
})

const mapReligion = (compendium: TCompendium, religion: TReligion): SidebarItemInterface => ({
  title: religion.name,
  to: `/compendia/${compendium?.slug}/religions/${religion.slug}`,
  icon: (props) => <ChurchIcon {...props}/>,
})

const mapPantheon = (compendium: TCompendium, pantheon: TPantheon): SidebarItemInterface => ({
  title: pantheon.name,
  to: `/compendia/${compendium?.slug}/pantheons/${pantheon.slug}`,
  icon: (props) => <ChurchIcon {...props}/>,
})

const mapCurrency = (compendium: TCompendium, currency: TCurrency): SidebarItemInterface => ({
  title: currency.name,
  to: `/compendia/${compendium?.slug}/currencies/${currency.slug}`,
  icon: (props) => <CoinsIcon {...props}/>,
})

const mapStory = (compendium: TCompendium, story: TStory): SidebarItemInterface => ({
  title: story.name,
  to: `/compendia/${compendium?.slug}/stories/${story.slug}`,
  icon: (props) => <BookIcon {...props}/>,
})

const mapNaturalResource = (compendium: TCompendium, naturalResource: TNaturalResource): SidebarItemInterface => ({
  title: naturalResource.name,
  to: `/compendia/${compendium?.slug}/naturalResources/${naturalResource.slug}`,
  icon: (props) => <FlowerIcon {...props}/>,
})

const mapPlane = (compendium: TCompendium, plane: TPlane): SidebarItemInterface => ({
  title: plane.name,
  to: `/compendia/${compendium?.slug}/planes/${plane.slug}`,
  icon: (props) => <CircleIcon {...props}/>,
})

const CompendiaWrapper = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false)

  const nestedLocations: TLocation[] = createNestedArray(compendium.locations || []);

  const isNew = (): boolean => compendiumId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewCompendium(compendiumId)
      .then(response => {
        setLoading(false)
        dispatch(setCompendiumData(response.data.data))
      })
  }

  useEffect(() => {
    if (compendiumId && !isNew()) {
      fetch()
    }
    if (isNew()) {
      dispatch(clearCompendiumData(undefined))
    }
  }, [compendiumId])

  return (
    <>
      {compendiumId !== 'new' && (
        <Sidebar
          title={'Compendium'}
          items={
            [
              {
                title: 'Bestiary',
                hasChildren: compendium.hasSpecies,
                addNewLink: `/compendia/${compendium.slug}/species/new`,
                icon: (props) => <CatIcon {...props}/>,
                children: compendium.species?.map(species => mapSpecies(compendium, species)),
                loadChildren: () => {
                  indexSpecies(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({species: data.data}))
                    })
                }
              },
              {
                title: 'Characters',
                hasChildren: compendium.hasCharacters,
                addNewLink: `/compendia/${compendium.slug}/characters/new`,
                icon: (props) => <PersonStandingIcon {...props}/>,
                children: compendium.characters?.map(character => mapCharacter(compendium, character)),
                loadChildren: () => {
                  indexCharacters(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({characters: data.data}))
                    })
                }
              },
              {
                title: 'Concepts',
                hasChildren: compendium.hasConcepts,
                addNewLink: `/compendia/${compendium.slug}/concepts/new`,
                icon: (props) => <CircleEllipsisIcon {...props}/>,
                children: compendium.concepts?.map(concept => mapConcept(compendium, concept)),
                loadChildren: () => {
                  indexConcepts(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({concepts: data.data}))
                    })
                }
              },
              {
                title: 'Culture',
                hasChildren: true,
                icon: (props) => <AsteriskIcon {...props}/>,
                startOpen: true,
                children: [
                  {
                    title: 'Languages',
                    hasChildren: compendium.hasLanguages,
                    addNewLink: `/compendia/${compendium.slug}/languages/new`,
                    icon: (props) => <LanguagesIcon {...props}/>,
                    children: compendium.languages?.map(language => mapLanguage(compendium, language)),
                    loadChildren: () => {
                      indexLanguages(compendium.slug)
                        .then(({ data }) => {
                          dispatch(updateCompendiumData({languages: data.data}))
                        })
                    }
                  },
                  {
                    title: 'Religions',
                    hasChildren: compendium.hasReligions,
                    addNewLink: `/compendia/${compendium.slug}/religions/new`,
                    icon: (props) => <ChurchIcon {...props}/>,
                    children: compendium.religions?.map(currency => mapReligion(compendium, currency)),
                    loadChildren: () => {
                      indexReligions(compendium.slug)
                        .then(({ data }) => {
                          dispatch(updateCompendiumData({religions: data.data}))
                        })
                    }
                  },
                  {
                    title: 'Currencies',
                    hasChildren: compendium.hasCurrencies,
                    addNewLink: `/compendia/${compendium.slug}/currencies/new`,
                    icon: (props) => <LanguagesIcon {...props}/>,
                    children: compendium.currencies?.map(currency => mapCurrency(compendium, currency)),
                    loadChildren: () => {
                      indexCurrencies(compendium.slug)
                        .then(({ data }) => {
                          dispatch(updateCompendiumData({currencies: data.data}))
                        })
                    }
                  },
                ]
              },
              {
                title: 'Factions & Societies',
                hasChildren: compendium.hasFactions,
                addNewLink: `/compendia/${compendium.slug}/factions/new`,
                icon: (props) => <ShieldIcon {...props}/>,
                children: compendium.factions?.map(faction => mapFaction(compendium, faction)),
                loadChildren: () => {
                  indexFactions(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({factions: data.data}))
                    })
                }
              },
              {
                title: 'Pantheons',
                hasChildren: compendium.hasPantheons,
                addNewLink: `/compendia/${compendium.slug}/pantheons/new`,
                icon: (props) => <SunIcon {...props}/>,
                children: compendium.pantheons?.map(pantheon => mapPantheon(compendium, pantheon)),
                loadChildren: () => {
                  indexPantheons(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({pantheons: data.data}))
                    })
                }
              },
              {
                title: 'Geography',
                hasChildren: compendium.hasLocations,
                addNewLink: `/compendia/${compendium.slug}/locations/new`,
                icon: (props) => <MapIcon {...props}/>,
                children: nestedLocations?.map(location => mapLocation(compendium, location)),
                loadChildren: () => {
                  indexLocations(compendium.slug, { include: 'parent' })
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({locations: data.data}))
                    })
                }
              },
              {
                title: 'Items',
                hasChildren: compendium.hasItems,
                addNewLink: `/compendia/${compendium.slug}/items/new`,
                icon: (props) => <SwordIcon {...props}/>,
                children: compendium.items?.map(item => mapItem(compendium, item)),
                loadChildren: () => {
                  indexItems(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({items: data.data}))
                    })
                }
              },
              {
                title: 'Lore & History',
                hasChildren: compendium.hasStories,
                addNewLink: `/compendia/${compendium.slug}/stories/new`,
                icon: (props) => <BookIcon {...props}/>,
                children: compendium.stories?.map(story => mapStory(compendium, story)),
                loadChildren: () => {
                  indexStories(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({stories: data.data}))
                    })
                }
              },
              {
                title: 'Natural Resources',
                hasChildren: compendium.hasNaturalResources,
                addNewLink: `/compendia/${compendium.slug}/naturalResources/new`,
                icon: (props) => <FlowerIcon {...props}/>,
                children: compendium.naturalResources?.map(naturalResource => mapNaturalResource(compendium, naturalResource)),
                loadChildren: () => {
                  indexNaturalResources(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({naturalResources: data.data}))
                    })
                }
              },
              {
                title: 'Planes',
                hasChildren: compendium.hasPlanes,
                addNewLink: `/compendia/${compendium.slug}/planes/new`,
                icon: (props) => <CircleIcon {...props}/>,
                children: compendium.planes?.map(plane => mapItem(compendium, plane)),
                loadChildren: () => {
                  indexPlanes(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({planes: data.data}))
                    })
                }
              },
            ]
          }/>
      )}
      <div className="relative w-full">
        <LoadingWrapper loading={loading}>
          <Outlet/>
        </LoadingWrapper>
      </div>
    </>
  )
}

export default CompendiaWrapper