import { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
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
  StarIcon,
  SunIcon,
  SwordIcon,
  SwordsIcon,
  WandIcon
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { TLocation } from '../../types'
import { indexLocations } from '../../services/LocationService'
import {
  clearCompendiumData, setCompendiumData, updateCompendiumData
} from '../../reducers/compendium/compendiumSlice'
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
import { indexDeities } from '../../services/DeityService'
import { TCompendiaWrapperProps } from './types'
import { RootState } from '../../store'
import { viewCompendium } from '../../services/CompendiumService'
import useCompendiaMapping from './useCompendiaMapping'

const CompendiaWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium, loading } = useAppSelector((state: RootState) => state.compendium) // redux
  const { compendiumId } = useParams() as { compendiumId: string } // router

  const dispatch = useAppDispatch()

  const nestedLocations: TLocation[] = createNestedArray(compendium.locations || [])

  useEffect(() => {
    if (!loading) {
      viewCompendium(compendiumId, { include: 'images' })
        .then(({ data }) => {
          dispatch(setCompendiumData(data.data))
        })
    }
    return () => { // todo is this the right place?
      dispatch(clearCompendiumData(undefined))
    }
  }, [])

  const {
    mapCharacter,
    mapConcept,
    mapCurrency,
    mapDeity,
    mapEncounter,
    mapFaction,
    mapItem,
    mapLanguage,
    mapLocation,
    mapNaturalResource,
    mapPantheon,
    mapPlane,
    mapQuest,
    mapReligion,
    mapSpecies,
    mapSpell,
    mapStory
  } = useCompendiaMapping({ compendium })

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
                hasChildren: compendium.hasCharacters,
                addNewLink: `/compendia/${compendium.slug}/characters/new`,
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
                hasChildren: compendium.hasConcepts,
                addNewLink: `/compendia/${compendium.slug}/concepts/new`,
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
                hasChildren: true,
                icon: (props) => <AsteriskIcon {...props}/>,
                startOpen: true,
                children: [
                  {
                    title: 'Languages',
                    hasChildren: compendium.hasLanguages,
                    addNewLink: `/compendia/${compendium.slug}/languages/new`,
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
                    hasChildren: true,
                    icon: (props) => <SunIcon {...props}/>,
                    startOpen: true,
                    children: [
                      {
                        title: 'Religions',
                        hasChildren: compendium.hasReligions,
                        addNewLink: `/compendia/${compendium.slug}/religions/new`,
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
                        hasChildren: compendium.hasPantheons,
                        addNewLink: `/compendia/${compendium.slug}/pantheons/new`,
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
                        hasChildren: compendium.hasDeities,
                        addNewLink: `/compendia/${compendium.slug}/deities/new`,
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
                    hasChildren: compendium.hasCurrencies,
                    addNewLink: `/compendia/${compendium.slug}/currencies/new`,
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
                hasChildren: compendium.hasFactions,
                addNewLink: `/compendia/${compendium.slug}/factions/new`,
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
                hasChildren: compendium.hasLocations,
                addNewLink: `/compendia/${compendium.slug}/locations/new`,
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
                hasChildren: compendium.hasItems,
                addNewLink: `/compendia/${compendium.slug}/items/new`,
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
                hasChildren: compendium.hasNaturalResources,
                addNewLink: `/compendia/${compendium.slug}/naturalResources/new`,
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
                hasChildren: compendium.hasPlanes,
                addNewLink: `/compendia/${compendium.slug}/planes/new`,
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
                hasChildren: compendium.hasStories,
                addNewLink: `/compendia/${compendium.slug}/stories/new`,
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
                hasChildren: compendium.hasSpells,
                addNewLink: `/compendia/${compendium.slug}/spells/new`,
                icon: (props) => <WandIcon {...props}/>,
                children: compendium.spells?.map(spell => mapSpell(spell)),
                loadChildren: () => {
                  indexStories(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({ spells: data.data }))
                    })
                }
              },
              {
                title: 'Quests',
                hasChildren: compendium.hasQuests,
                addNewLink: `/compendia/${compendium.slug}/quests/new`,
                icon: (props) => <StarIcon {...props}/>,
                children: compendium.quests?.map(quest => mapQuest(quest)),
                loadChildren: () => {
                  indexStories(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({ quests: data.data }))
                    })
                }
              },
              {
                title: 'Encounters',
                hasChildren: compendium.hasEncounters,
                addNewLink: `/compendia/${compendium.slug}/encounters/new`,
                icon: (props) => <SwordsIcon {...props}/>,
                children: compendium.encounters?.map(encounter => mapEncounter(encounter)),
                loadChildren: () => {
                  indexStories(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({ encounters: data.data }))
                    })
                }
              },
            ]
          }/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CompendiaWrapper