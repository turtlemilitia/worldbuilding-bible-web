import React, { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

import { MenuItemInterface } from './MenuItemInterface'

const DropdownItem = ({ menuItem }: { menuItem: MenuItemInterface }): JSX.Element => {
  const { to, title } = menuItem

  const plus = to.endsWith('new')

  return (
    <li>
      <NavLink to={to}
               className={`block ${!plus && 'w-36'} px-3 py-3 font-serif text-serif-md text-stone-300 text-center hover:bg-stone-600`}>
        {plus ? <PlusIcon color="white" className="inline-block"/> : title}
      </NavLink>
    </li>
  )
}

export default DropdownItem