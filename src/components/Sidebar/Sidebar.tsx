import { JSX, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LucideProps } from 'lucide-react'
import SidebarItem from './SidebarItem'
import { FloatingBox } from '../FloatingBox'

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
          <FloatingBox>
            <div className="max-h-underScreen overflow-y-auto">
              <h2 className="text-xl font-sans-serif tracking-widest uppercase text-stone-400">{title}</h2>
              <ul className="mt-5 text-sm">
                {items.map((item, index) => {
                  return <SidebarItem item={item} key={index}/>
                })}
              </ul>
            </div>
          </FloatingBox>
        </div>
      </div>
    </div>
  )
}

export default Sidebar