import { JSX } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { SwordsIcon } from 'lucide-react'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const SystemsWrapper = (): JSX.Element => {

  const { systems } = useAppSelector((state: RootState) => state.systems) // redux

  return (
    <>
      {systems.length > 1 && (
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