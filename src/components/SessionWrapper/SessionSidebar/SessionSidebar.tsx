import { FunctionComponent } from 'react'
import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import { TSessionSidebarProps } from './types'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import SidebarSection from '@/components/Sidebar/SidebarSection'

const SessionSidebar: FunctionComponent<TSessionSidebarProps> = ({ campaign }) => {

  const { mapSession } = useCampaignsMapping({ campaignId: campaign.slug })

  const items: SidebarItemInterface[] = campaign.sessions?.map(
    session => mapSession(session))

  return (
    <Sidebar
      title={'Sessions'}
      addNew={`/campaigns/${campaign.slug}/sessions/new`}
      canAdd={campaign.canUpdate}
    >
      <SidebarSection items={items}/>
    </Sidebar>
  )
}

export default SessionSidebar