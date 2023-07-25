import React, { JSX } from 'react'
import MenuItem from './MenuItem'

export interface MenuItemInterface {
  title: string;
  to: string;
  children?: MenuItemInterface[];
}

const Menu = (): JSX.Element => {

  const systems: any[] = []; // todo redux
  const settings: any[] = []; // todo redux

  const menuItems: MenuItemInterface[] = [
    {
      title: 'Systems',
      to: '/systems',
      children: [
        ...systems?.map(({ id, name }) => ({
          title: name,
          to: `/systems/${id}`
        })) || [],
        {
          title: 'Create new',
          to: '/systems/new',
        }
      ]
    },
    {
      title: 'Settings',
      to: '/settings',
      children: [
        ...settings?.map(({ id, name }) => ({
          title: name,
          to: `/settings/${id}`
        })) || [],
        {
          title: 'Create new',
          to: '/settings/new',
        }
      ]
    },
    {
      title: 'Campaigns',
      to: '/campaigns'
    },
    {
      title: 'Locations',
      to: '/locations'
    },
    {
      title: 'Scrapbook',
      to: '/scrapbook',
      children: [
        {
          title: 'New',
          to: '/scrapbook/new'
        }
      ]
    }
  ];

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