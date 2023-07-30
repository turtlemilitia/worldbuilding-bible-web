import {JSX} from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from "../../components/Sidebar/Sidebar";
import {Swords} from "lucide-react";
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const SystemsWrapper = (): JSX.Element => {

  const { systems } = useAppSelector((state: RootState) => state.systems) // redux

  return (
    <>
      <Sidebar
        title={"Systems"}
        items={systems.map(({slug, name}) => ({
          title: name,
          to: `/systems/${slug}`,
          icon: (props) => <Swords {...props}/>
        }))}/>
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SystemsWrapper