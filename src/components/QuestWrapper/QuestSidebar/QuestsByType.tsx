import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'
import React from 'react'
import { TCampaign } from '@/types'
import useCampaignsMapping from '@/hooks/useCampaignsMapping'
import { useQuestTypeIndexDataManager } from '@/hooks/DataManagers'

type TOwmProps = {
  campaign: TCampaign;
  addNewLink: string;
  quests: TCampaign['quests']
}
const QuestsByType = ({ campaign, addNewLink, quests }: TOwmProps) => {

  const { questTypes: types } = useQuestTypeIndexDataManager()
  const { mapQuest } = useCampaignsMapping({ campaignId: campaign.slug })

  return <>
    {types?.filter(type => {
      return campaign.canUpdate ||
        quests?.find(quest => quest.type.id === type.id)
    }).map(type => (
      <SidebarSection
        title={`${type.name} Quests`}
        addNewLink={campaign.canUpdate ? addNewLink : undefined}
        addNewLinkState={{ type }}
        items={
          createNestedArray(
            quests?.filter(quest => quest.type.id === type.id),
          ).
            map(quest => mapQuest(quest))
        }
      />
    ))}
  </>
}

export default QuestsByType