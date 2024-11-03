import React, { FunctionComponent } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { TQuestSidebarProps } from './types'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import { useQuestTypeIndexDataManager } from '../../../hooks/DataManagers'
import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'

const QuestSidebar: FunctionComponent<TQuestSidebarProps> = React.memo(
  ({ campaign }) => {

    const { questTypes: types } = useQuestTypeIndexDataManager()

    const { mapQuest } = useCampaignsMapping({ campaignId: campaign.slug })

    const addNewLink = `/campaigns/${campaign.slug}/quests/new`

    return <Sidebar
      title={'Quests'}
      addNew={addNewLink}
      canAdd={campaign.canUpdate}
    >
      {types?.filter(type => {
        return campaign.canUpdate ||
          campaign.quests?.find(quest => quest.type.id === type.id)
      }).map(type => (
        <SidebarSection
          title={`${type.name} Quests`}
          addNewLink={campaign.canUpdate ? addNewLink : undefined}
          addNewLinkState={{ type }}
          items={
            createNestedArray(
              campaign.quests?.filter(quest => quest.type.id === type.id),
            ).
              map(quest => mapQuest(quest))
          }
        />
      ))}
    </Sidebar>
  })

export default QuestSidebar