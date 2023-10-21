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
  const { compendia } = useAppSelector((state: RootState) => state.compendia) // redux

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
      title: 'Compendia',
      to: '/compendia',
      children: [
        ...compendia?.map(({ slug, name }) => ({
          title: name,
          to: `/compendia/${slug}`
        })) || [],
        {
          title: 'Create new',
          to: '/compendia/new',
        }
      ]
    },
    {
      title: 'Campaigns',
      to: '/campaigns'
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