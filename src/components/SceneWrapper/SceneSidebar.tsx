import React, { FunctionComponent } from 'react'
import Sidebar, { SidebarItemInterface } from '../Sidebar/Sidebar'
import useCampaignsMapping from '../../hooks/useCampaignsMapping'
import { TCampaign } from '../../types'

export type TSceneSidebarProps = {
  campaign: TCampaign
}
const SceneSidebar: FunctionComponent<TSceneSidebarProps> = ({ campaign }) => {

  const { mapScene } = useCampaignsMapping({ campaignId: campaign.slug })

  const items: SidebarItemInterface[] = campaign.scenes?.map(scene => mapScene(scene)) ?? []

  return <Sidebar title={'Scenes'} items={items}/>
}

export default SceneSidebar