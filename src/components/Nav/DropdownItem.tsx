import React, { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { MenuItemInterface } from './Menu'

const DropdownItem = ({ menuItem }: { menuItem: MenuItemInterface }): JSX.Element => {
  const { to, title, children } = menuItem

  const plus = to.indexOf('new') !== -1

  return (
    <li>
        <NavLink to={to}
              className={`block ${!plus && 'w-36'} px-3 py-3 text-sm text-stone-300 text-center hover:bg-stone-600`}>
          {plus ? <Plus color="white" className="inline-block"/> : title}
        </NavLink>
    </li>
  )
}

export default DropdownItem