import React, { JSX, useEffect, useState } from 'react'
import { LucideProps, PlusIcon } from 'lucide-react'
import SidebarItem from './SidebarItem'
import { FloatingBox } from '../FloatingBox'
import { Link } from 'react-router-dom'
import { useCampaignDataManager } from '../../hooks/DataManagers'

export interface SidebarItemInterface {
  id?: string;
  title: string;
  subtitle?: string;
  to?: string;
  icon?: (props: LucideProps) => JSX.Element,
  addNewLink?: string;
  addNewLinkState?: object;
  hasChildren?: boolean;
  children?: SidebarItemInterface[];
  loadChildren?: () => any,
  startOpen?: boolean,
  onDelete?: () => any;
}

interface TOwnProps {
  title: string;
  items: SidebarItemInterface[],
  addNew?: string,
}

const Sidebar = ({ title, items, addNew }: TOwnProps): JSX.Element => {

  const [show, setShow] = useState<boolean>(false)

  const { campaign } = useCampaignDataManager()

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="relative flex w-full">
      <div className={`fixed z-50 ${campaign ? 'top-28' : 'top-14'} left-0 pt-5 max-h-underScreen w-1/4`}>
        <div
          className={`absolute transition-all duration-1000 ${show ? 'top-5 opacity-100' : '-top-14 opacity-0'} w-full px-6`}>
          <FloatingBox>
            <div className="max-h-underScreen overflow-y-auto">
              <div className="flex justify-between">
                <h2 className="text-xl font-sans-serif tracking-widest uppercase text-stone-400">{title}</h2>
                {addNew && (
                  <Link to={addNew}
                        className={`block w-7 font-serif text-serif-md text-stone-300 text-center`}>
                    <PlusIcon color="white" className="inline-block"/>
                  </Link>
                )}
              </div>
              <ul className="mt-5 font-serif text-serif-md leading-none">
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