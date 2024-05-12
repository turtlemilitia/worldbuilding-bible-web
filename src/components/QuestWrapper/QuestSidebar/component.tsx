import React, { FunctionComponent, useContext, useMemo } from 'react'
import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import { TQuestSidebarProps } from './types'
import { StarIcon } from 'lucide-react'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import { QuestWrapperContext } from '../component'
import { createNestedArray } from '../../../utils/treeUtils'

const QuestSidebar: FunctionComponent<TQuestSidebarProps> = React.memo(({ campaign }) => {

  const {mapQuest} = useCampaignsMapping({ campaignId: campaign.slug });

  const types = useContext(QuestWrapperContext)

  const items: SidebarItemInterface[] = useMemo( () => types?.map(type => {

    const nestedQuests = createNestedArray(campaign.quests?.filter(quest => quest.type.id === type.id) || [])

    return {
      title: `${type.name} Quests`,
      addNewLink: `/campaigns/${campaign.slug}/quests/new`,
      addNewLinkState: { type: type.id },
      icon: (props) => <StarIcon {...props}/>,
      children: nestedQuests.map(quest => mapQuest(quest)) ?? []
    }
  }) || [], [types, campaign.quests, campaign.slug, mapQuest])

  return <Sidebar title={'Quests'} items={items}/>
})

export default QuestSidebar