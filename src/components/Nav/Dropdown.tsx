import React, { JSX } from 'react'
import DropdownItem from './DropdownItem'
import { MenuItemInterface } from './Menu'

interface DropdownParams {
  menuItems: MenuItemInterface[],
  show: boolean
}

const Dropdown = ({ menuItems, show }: DropdownParams): JSX.Element => {

  const rounded = menuItems.length > 1 ? 'rounded-xl' : 'rounded-full'

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 font-normal transition-all duration-1000 ${show ? 'top-12 z-10 opacity-100' : 'top-0 -z-10 opacity-0'} bg-stone-800 divide-y divide-stone-300 ${rounded} shadow`}>
      <ul className={`py-2 text-sm text-stone-700`}>
        {menuItems.map((menuItem, index) => {

          const isLastAndNew = (menuItems.length - 1 === index) && menuItem.to.indexOf('new')
          const hasBorder = menuItems.length > 1 && isLastAndNew

          return (
            <div className={hasBorder ? 'py-1 border-t border-t-stone-500' : ''} key={index}>
              <DropdownItem
                menuItem={menuItem}
                key={index}
              />
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default Dropdown