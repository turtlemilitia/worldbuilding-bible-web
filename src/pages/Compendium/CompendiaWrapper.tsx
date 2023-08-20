import { JSX } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { MapIcon, MapPinIcon, PersonStandingIcon, SwordIcon, UserIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCompendium, TLocation, TCharacter } from '../../types'
import { indexLocations } from '../../services/LocationService'
import { updateCompendiumData } from '../../reducers/compendium/compendiumSlice'
import { createNestedArray } from '../../utils/treeUtils'
import { indexCharacters } from '../../services/CharacterService'

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
              }
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