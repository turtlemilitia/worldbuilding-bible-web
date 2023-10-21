import React, { JSX, useState } from 'react'
import { NavLink, useLocation, useMatch, useResolvedPath, useSearchParams } from 'react-router-dom'
import Dropdown from './Dropdown'
import { MenuItemInterface } from './Menu'
import { ChevronDownIcon } from 'lucide-react'

const MenuItem = ({ menuItem }: { menuItem: MenuItemInterface }): JSX.Element => {
  const { title, to, children } = menuItem
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  let location = useLocation()
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: false })

  if (!children) {
    return <li>
      <NavLink to={to} className="block px-4 py-2">{title}</NavLink>
    </li>
  }

  const activeChild = children.find(child => {
    return location.pathname.includes(child.to)
  })
  return (
    <li>
      <button
        className="relative px-4 py-2 "
        aria-expanded={showDropdown ? 'true' : 'false'}
        onClick={() => setShowDropdown((prev) => !prev)}>
        {title} <ChevronDownIcon size={20} className={`inline-block ${match ? '-rotate-90' : ''}`}/> {activeChild ? <NavLink to={activeChild.to} className="font-bold">{activeChild.title}</NavLink> : ''}
        <Dropdown menuItems={children} show={showDropdown}/>
      </button>
    </li>
  )
}

export default MenuItem