import React, { FunctionComponent, useContext } from 'react'
import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import { TQuestSidebarProps } from './types'
import { StarIcon } from 'lucide-react'
import useCampaignsMapping from '../../../utils/hooks/useCampaignsMapping'
import { QuestWrapperContext } from '../component'

const QuestSidebar: FunctionComponent<TQuestSidebarProps> = React.memo(({ campaign }) => {

  const {mapQuest} = useCampaignsMapping({ campaignId: campaign.slug });

  const types = useContext(QuestWrapperContext)

  const items: SidebarItemInterface[] = types?.map(type => ({
    title: `${type.name} Quests`,
    addNewLink: `/campaigns/${campaign.slug}/quests/new`,
    addNewLinkState: { type: type.id },
    icon: (props) => <StarIcon {...props}/>,
    children: campaign.quests?.filter(quest => quest.type.id === type.id).map(quest => mapQuest(quest)) ?? []
  })) ?? []

  return <Sidebar title={'Quests'} items={items}/>
})

export default QuestSidebar