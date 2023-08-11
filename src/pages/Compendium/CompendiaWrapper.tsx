import { JSX } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { MapIcon } from 'lucide-react'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const CompendiaWrapper = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  return (
    <>
      {compendiumId !== 'new' && (
        <Sidebar
          title={'Compendium'}
          items={
            [
              {
                title: 'Geography',
                hasChildren: compendium.hasLocations,
                addNewLink: `/compendia/${compendium.slug}/locations/new`,
                icon: (props) => <MapIcon {...props}/>
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