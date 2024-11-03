import React, { FunctionComponent } from 'react'
import Sidebar, { SidebarItemInterface } from '../Sidebar/Sidebar'
import useCampaignsMapping from '../../hooks/useCampaignsMapping'
import { TCampaign } from '@/types'
import SidebarSection from '@/components/Sidebar/SidebarSection'

export type TSceneSidebarProps = {
  campaign: TCampaign
}
const SceneSidebar: FunctionComponent<TSceneSidebarProps> = ({ campaign }) => {

  const { mapScene } = useCampaignsMapping({ campaignId: campaign.slug })

  const items: SidebarItemInterface[] = [...campaign.scenes].sort((a, b) => a.name.localeCompare(b.name)).map(scene => mapScene(scene)) ?? []

  return <Sidebar
    title={'Scenes'}
    addNew={`/campaigns/${campaign.slug}/scenes/new`}
    canAdd={campaign.canUpdate}
  >
    <SidebarSection items={items}/>
  </Sidebar>
}

export default SceneSidebar