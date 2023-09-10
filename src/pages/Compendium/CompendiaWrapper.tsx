import { JSX } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import {
  AsteriskIcon,
  CatIcon,
  MapIcon,
  MapPinIcon,
  PersonStandingIcon,
  StarIcon,
  SwordIcon,
  UserIcon
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCompendium, TLocation, TCharacter, TSpecies, TItem, TConcept } from '../../types'
import { indexLocations } from '../../services/LocationService'
import { updateCompendiumData } from '../../reducers/compendium/compendiumSlice'
import { createNestedArray } from '../../utils/treeUtils'
import { indexCharacters } from '../../services/CharacterService'
import { indexSpecies } from '../../services/SpeciesService'
import { indexItems } from '../../services/ItemService'


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

const CompendiaWrapper = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const dispatch = useAppDispatch();

  const nestedLocations: TLocation[] = createNestedArray(compendium.locations || []);
  console.log(nestedLocations)

  return (
    <>
      {compendiumId !== 'new' && (
        <Sidebar
          title={'Compendium'}
          items={
            [
              {
                title: 'Concepts',
                hasChildren: compendium.hasConcepts,
                addNewLink: `/compendia/${compendium.slug}/concepts/new`,
                icon: (props) => <AsteriskIcon {...props}/>,
                children: compendium.concepts?.map(concept => mapConcept(compendium, concept)),
                loadChildren: () => {
                  indexItems(compendium.slug)
                    .then(({ data }) => {
                      dispatch(updateCompendiumData({concepts: data.data}))
                    })
                }
              },
              {
                title: 'Species',
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
                title: 'Geography',
                hasChildren: compendium.hasLocations,
                addNewLink: `/compendia/${compendium.slug}/locations/new`,
                icon: (props) => <MapIcon {...props}/>,
                children: nestedLocations?.map(location => mapLocation(compendium, location)),
                loadChildren: () => {
                  indexLocations(compendium.slug, ['parent'])
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