import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { SwordsIcon } from 'lucide-react'
import { useSystemIndexDataManager } from '../../hooks/DataManagers'
import SidebarSection from '@/components/Sidebar/SidebarSection'

const SystemsWrapper = (): JSX.Element => {

  const { systems } = useSystemIndexDataManager()

  return (
    <>
      {systems && systems.length > 1 && (
        <Sidebar title={'Systems'}>
          <SidebarSection
            items={systems.map(({ slug, name }) => ({
              title: name,
              to: `/systems/${slug}`,
              icon: (props) => <SwordsIcon {...props}/>
            }))}/>
        </Sidebar>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SystemsWrapper