import React, { FunctionComponent, JSX, useState } from 'react'
import { NavLink, useLocation, useMatch, useResolvedPath } from 'react-router-dom'
import Dropdown from './Dropdown'
import { ChevronDownIcon } from 'lucide-react'
import { MenuItemInterface } from './MenuItemInterface'

type TProps = {
  menuItem: MenuItemInterface,
  className?: string
  activeClassName?: string
}

const MenuItem: FunctionComponent<TProps> = ({ menuItem, className = '', activeClassName = 'text-emerald-600' }): JSX.Element => {
  const { title, to, children, hide } = menuItem
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  let location = useLocation()
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: false })

  if (hide) {
    return <></>
  }
  
  if (!children) {
    const active = location.pathname.includes(menuItem.to)
    return <li>
      <NavLink to={to} className={`block py-2 ${active ? activeClassName : ''} ${className}`}>{title}</NavLink>
    </li>
  }

  const activeChild = children.find(child => {
    return location.pathname.includes(child.to)
  })

  return (
    <li>
      <button
        className="relative py-2 "
        aria-expanded={showDropdown ? 'true' : 'false'}
        onClick={() => setShowDropdown((prev) => !prev)}>
        {title} <ChevronDownIcon size={20} className={`inline-block ${match ? '-rotate-90' : ''} ${className}`}/> {activeChild ? <NavLink to={activeChild.to} className={`${activeClassName} ${className}`}>{activeChild.title}</NavLink> : ''}
        <Dropdown menuItems={children} show={showDropdown}/>
      </button>
    </li>
  )
}

export default MenuItem