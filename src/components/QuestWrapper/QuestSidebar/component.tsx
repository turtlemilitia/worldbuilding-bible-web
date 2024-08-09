import React, { FunctionComponent, useMemo } from 'react'
import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import { TQuestSidebarProps } from './types'
import { StarIcon } from 'lucide-react'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import { createNestedArray } from '../../../utils/treeUtils'
import { useQuestTypeIndexDataManager } from '../../../hooks/DataManagers'

const QuestSidebar: FunctionComponent<TQuestSidebarProps> = React.memo(({ campaign }) => {

  const { questTypes: types } = useQuestTypeIndexDataManager()

  const { mapQuest } = useCampaignsMapping({ campaignId: campaign.slug })

  const items: SidebarItemInterface[] = useMemo(() => types?.map(type => {

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