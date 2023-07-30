import { JSX, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LucideProps } from 'lucide-react'

export interface SidebarItemInterface {
  title: string;
  to: string;
  icon?: (props: LucideProps) => JSX.Element,
  children?: SidebarItemInterface[];
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
    <div className={`fixed z-10 top-14 left-0 pt-5 pl-5 h-screen`}>
      <div
        className={`absolute transition-all duration-1000 ${show ? 'top-5 opacity-100' : '-top-14 opacity-0'} scroll-auto rounded-3xl bg-stone-900 border border-stone-700 w-80 py-6 px-10 text-stone-300`}>
        <h2 className="text-xl">{title}</h2>
        <ul className="mt-5">
          {items.map((item, index) => {
            return (
              <li key={index} className="my-3">
                <NavLink to={item.to} className={({ isActive }) => isActive ? 'font-bold' : ''}>
                  {item.icon && item.icon({ color: 'white', size: 14, className: 'inline-block mr-3' })}{item.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar