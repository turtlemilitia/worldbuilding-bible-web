import React, { JSX } from 'react'
import { MenuItemInterface } from './MenuItems'
import MenuItem from './MenuItem'

interface MenuParams {
  menuItems: MenuItemInterface[]
}

const Menu = ({ menuItems }: MenuParams): JSX.Element => {
  return (
    <ul className="flex space-x-3 items-center text-sm font-thin text-white">
      {menuItems.map((menuItem, index) => {
        return (
          <MenuItem menuItem={menuItem} key={index}/>
        )
      })}
    </ul>
  )
}

export default Menu;