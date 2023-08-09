import React, { JSX, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Dropdown from './Dropdown'
import { MenuItemInterface } from './Menu'
import { ChevronDownIcon } from 'lucide-react'

const MenuItem = ({ menuItem }: { menuItem: MenuItemInterface }): JSX.Element => {
  const { title, to, children } = menuItem
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  return (
    <li>
      {children ? (
        <>
          <button
            className="relative px-4 py-2 "
            aria-expanded={showDropdown ? 'true' : 'false'}
            onClick={() => setShowDropdown((prev) => !prev)}>
            {title} <ChevronDownIcon size={20} className="inline-block"/>
            <Dropdown menuItems={children} show={showDropdown}/>
          </button>
        </>
      ) : (
        <NavLink to={to} className="block px-4 py-2">{title}</NavLink>
      )}
    </li>
  )
}

export default MenuItem