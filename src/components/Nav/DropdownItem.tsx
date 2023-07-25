import React, { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { MenuItemInterface } from './Menu'

const DropdownItem = ({ menuItem }: { menuItem: MenuItemInterface }): JSX.Element => {
  const { to, title, children } = menuItem
  return (
    <li>
        <NavLink to={to}
              className="block px-3 py-1 text-sm text-stone-300">
          {to.indexOf('new') ? <Plus color="white"/> : title}
        </NavLink>
    </li>
  )
}

export default DropdownItem