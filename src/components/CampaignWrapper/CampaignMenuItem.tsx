import MenuItem from '../Nav/MenuItem'
import SansSerifText from '../SmallSansSerifText'
import React, { FunctionComponent } from 'react'
import { MenuItemInterface } from '../Nav/MenuItemInterface'
import { clsx } from 'clsx'

type TProps = {
  menuItem: MenuItemInterface
}
const CampaignMenuItem: FunctionComponent<TProps> = ({menuItem}) => {
  return (
    <SansSerifText>
      <MenuItem
        menuItem={menuItem}
        className={clsx([
          'p-4 pr-3',
          'h-8',
          'border border-transparent',
          'rounded-full',
          'transition-all ease-in-out duration-500',
          'hover:border-yellow-500',
          'hover:bg-stone-400 hover:bg-opacity-10 hover:backdrop-blur-sm'
        ])}
        activeClassName={clsx([
          'shadow-md shadow-stone-950',
          'bg-yellow-500 bg-opacity-50 backdrop-blur-sm'
        ])}
        matchExact={menuItem.title === 'The Campaign'}
      />
    </SansSerifText>
  )
}

export default CampaignMenuItem