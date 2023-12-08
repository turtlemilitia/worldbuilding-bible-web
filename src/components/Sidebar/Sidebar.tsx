import { JSX, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LucideProps } from 'lucide-react'
import SidebarItem from './SidebarItem'

export interface SidebarItemInterface {
  title: string;
  to?: string;
  icon?: (props: LucideProps) => JSX.Element,
  addNewLink?: string;
  hasChildren?: boolean;
  children?: SidebarItemInterface[];
  loadChildren?: () => any,
  startOpen?: boolean,
  onDelete?: () => any
}

interface TOwnProps {
  title: string;
  items: SidebarItemInterface[]
}

const Sidebar = ({ title, items }: TOwnProps): JSX.Element => {

  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="relative flex w-full">
      <div className={`fixed z-10 top-14 left-0 pt-5 max-h-underScreen w-1/4`}>
        <div
          className={`absolute transition-all duration-1000 ${show ? 'top-5 opacity-100' : '-top-14 opacity-0'} w-full px-3`}>
          <div className="antialiased shadow-md shadow-stone-800 rounded-3xl bg-stone-800 bg-opacity-70 backdrop-blur-md py-6 text-stone-300">
            <div className="max-h-underScreen px-8 overflow-y-auto">
              <h2 className="text-xl">{title}</h2>
              <ul className="mt-5 text-sm">
                {items.map((item, index) => {
                  return <SidebarItem item={item} key={index}/>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar