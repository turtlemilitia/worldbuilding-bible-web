import SansSerifText from '../SmallSansSerifText'
import React, { FunctionComponent } from 'react'
import { MenuItemInterface } from '../Nav/MenuItemInterface'
import { clsx } from 'clsx'
import {
  NavLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom'

type TProps = {
  menuItem: MenuItemInterface
}
const CampaignMenuItem: FunctionComponent<TProps> = ({ menuItem }) => {

  const { title, to } = menuItem

  let resolved = useResolvedPath(to)
  let match = useMatch(
    { path: resolved.pathname, end: menuItem.title === 'The Campaign' })

  return <SansSerifText>
    <li>
      <NavLink to={to} className={clsx([
        'block py-2 p-4 pr-3',
        'h-8',
        'border border-transparent',
        'rounded-full',
        'transition-all ease-in-out duration-500',
        'hover:border-yellow-500',
        'hover:bg-stone-400 hover:bg-opacity-10 hover:backdrop-blur-sm',
        ...(match ? [
          'shadow-md shadow-stone-950',
          'bg-yellow-500 bg-opacity-50 backdrop-blur-sm',
        ] : [])
      ])}>{title}</NavLink>
    </li>
  </SansSerifText>
}

export default CampaignMenuItem