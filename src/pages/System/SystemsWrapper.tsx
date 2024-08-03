import { JSX } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { SwordsIcon } from 'lucide-react'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { useSystemIndexDataManager } from '../../hooks/DataManagers'

const SystemsWrapper = (): JSX.Element => {

  const { systems } = useSystemIndexDataManager()

  return (
    <>
      {systems && systems.length > 1 && (
        <Sidebar
          title={'Systems'}
          items={systems.map(({ slug, name }) => ({
            title: name,
            to: `/systems/${slug}`,
            icon: (props) => <SwordsIcon {...props}/>
          }))}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SystemsWrapper