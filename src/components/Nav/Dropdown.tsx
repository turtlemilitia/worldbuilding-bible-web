import React, { JSX } from 'react'
import { MenuItemInterface } from './MenuItems'
import MenuItem from './MenuItem'

interface MenuParams {
  menuItems: MenuItemInterface[],
  show: boolean
}

const Menu = ({ menuItems, show }: MenuParams): JSX.Element => {
  return (
    <div
      className={`absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${show ? '' : 'hidden'}`}>
      <ul className={`py-2 text-sm text-gray-700 dark:text-gray-400`}>
        {menuItems.map((menuItem, index) => {
          return (
            <MenuItem menuItem={menuItem} key={index}/>
          )
        })}
      </ul>
    </div>
  )
}

export default Menu