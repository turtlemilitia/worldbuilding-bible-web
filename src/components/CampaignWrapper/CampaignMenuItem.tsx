import MenuItem from '../Nav/MenuItem'
import SmallSansSerifText from '../SmallSansSerifText'
import React, { FunctionComponent } from 'react'
import { MenuItemInterface } from '../Nav/MenuItemInterface'

type TProps = {
  menuItem: MenuItemInterface
}
const CampaignMenuItem: FunctionComponent<TProps> = ({menuItem}) => {
  return (
    <SmallSansSerifText>
      <MenuItem
        menuItem={menuItem}
        className="p-4"
        activeClassName="border border-yellow-500 rounded-full shadow-md shadow-stone-950 bg-stone-400 bg-opacity-10 backdrop-blur-sm"
      />
    </SmallSansSerifText>
  )
}

export default CampaignMenuItem