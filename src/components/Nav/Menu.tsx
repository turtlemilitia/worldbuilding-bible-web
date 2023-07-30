import React, { JSX } from 'react'
import MenuItem from './MenuItem'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TSystem } from '../../types'

export interface MenuItemInterface {
  title: string;
  to: string;
  children?: MenuItemInterface[];
}

const Menu = (): JSX.Element => {

  const { systems } = useAppSelector((state: RootState) => state.systems) // redux
  const { settings } = useAppSelector((state: RootState) => state.settings) // redux

  const menuItems: MenuItemInterface[] = [
    {
      title: 'Systems',
      to: '/systems',
      children: [
        ...systems?.map(({ slug, name }) => ({
          title: name,
          to: `/systems/${slug}`
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
        ...settings?.map(({ slug, name }) => ({
          title: name,
          to: `/settings/${slug}`
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