import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'
import React from 'react'
import { TCampaign } from '@/types'
import useCampaignsMapping from '@/hooks/useCampaignsMapping'
import { useEncounterTypeIndexDataManager } from '@/hooks/DataManagers'

type TOwmProps = {
  campaign: TCampaign;
  addNewLink: string;
  encounters: TCampaign['encounters']
}
const EncountersByType = ({ campaign, addNewLink, encounters }: TOwmProps) => {

  const { encounterTypes: types } = useEncounterTypeIndexDataManager()
  const { mapEncounter } = useCampaignsMapping({ campaignId: campaign.slug })

  return <>
    {types?.filter(type => {
      return campaign.canUpdate ||
        encounters?.find(encounter => encounter.type.id === type.id)
    }).map(type => (
      <SidebarSection
        title={type.name}
        addNewLink={campaign.canUpdate ? addNewLink : undefined}
        addNewLinkState={{ type }}
        items={
          encounters?.filter(
            encounter => encounter.type.id === type.id).
            map(encounter => mapEncounter(encounter))
        }
      />
    ))}
  </>
}

export default EncountersByType