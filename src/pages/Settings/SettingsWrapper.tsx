import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Map, Swords } from 'lucide-react'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const SettingsWrapper = (): JSX.Element => {

  const { setting } = useAppSelector((state: RootState) => state.setting) // redux

  return (
    <>
      <Sidebar
        title={'Compendium'}
        items={
          [
            {
              title: 'Geography',
              hasChildren: setting.hasLocations,
              addNewLink: `/setting/${setting.slug}/locations/new`,
              icon: (props) => <Map {...props}/>
            }
          ]
        }/>
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SettingsWrapper