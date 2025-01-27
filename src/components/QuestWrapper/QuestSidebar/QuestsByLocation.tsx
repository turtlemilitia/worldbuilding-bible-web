import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'
import React, { useMemo } from 'react'
import { TCampaign, TLocation, TQuest } from '@/types'
import useCampaignsMapping from '@/hooks/useCampaignsMapping'
import { isEmpty } from 'lodash'

type TOwmProps = {
  campaign: TCampaign;
  addNewLink: string;
  quests: TQuest[]
}
const QuestsByLocation = ({ campaign, addNewLink, quests }: TOwmProps) => {

  const { mapQuest } = useCampaignsMapping({ campaignId: campaign.id })

  const locations = useMemo(() => {
    // Use a Map to keep track of unique locations by ID
    const uniqueLocationsMap = new Map<number, TLocation>();

    quests.forEach(quest => {
      quest.locations.forEach(location => {
        uniqueLocationsMap.set(location.id, location);
      });
    });

    // Convert the Map back to an array
    return Array.from(uniqueLocationsMap.values());
  }, [quests]);

  return <>
    <SidebarSection
      title={''}
      addNewLink={campaign.canUpdate ? addNewLink : undefined}
      items={
        createNestedArray(
          quests?.filter(quest => isEmpty(quest.locations)),
        ).
          map(quest => mapQuest(quest))
      }
    />
    {locations?.filter(location => {
      return campaign.canUpdate ||
        quests?.find(quest => quest.locations.find(questLocation => questLocation.id === location.id))
    }).map(location => (
      <SidebarSection
        title={location.name}
        addNewLink={campaign.canUpdate ? addNewLink : undefined}
        addNewLinkState={{ location }}
        items={
          createNestedArray(
            quests?.filter(quest => quest.locations.find(questLocation => questLocation.id === location.id)),
          ).
            map(quest => mapQuest(quest))
        }
      />
    ))}
  </>
}

export default QuestsByLocation