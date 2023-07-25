import React, { JSX, useState } from 'react'
import ChevronDown from '../Icons/ChevronDown'
import { Link } from 'react-router-dom'
import { MenuItemInterface } from './MenuItems'
import Dropdown from './Dropdown'

const MenuItem = ({ menuItem }: { menuItem: MenuItemInterface }): JSX.Element => {
  const { title, to, children, special } = menuItem
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  return (
    <li>
      {children ? (
        <>
          <button
            aria-expanded={showDropdown ? 'true' : 'false'}
            onClick={() => setShowDropdown((prev) => !prev)}>
            {title} <ChevronDown className="w-3 h-3 inline-block"/>
            <Dropdown menuItems={children} show={showDropdown}/>
          </button>
        </>
      ) : (
        !special ? (
          <Link to={to}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{title}</Link>
        ) : (
          <div className="py-1 border-t border-t-gray-500">
            <Link to={to}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
              {title}
            </Link>
          </div>
        )
      )}
    </li>
  )
}

export default MenuItem