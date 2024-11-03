import React, { FunctionComponent } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { TEncounterSidebarProps } from './types'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import { useEncounterTypeIndexDataManager } from '../../../hooks/DataManagers'
import SidebarSection from '@/components/Sidebar/SidebarSection'

const EncounterSidebar: FunctionComponent<TEncounterSidebarProps> = ({ campaign }) => {

  const { encounterTypes: types } = useEncounterTypeIndexDataManager()

  const { mapEncounter } = useCampaignsMapping({ campaignId: campaign.slug })

  const addNewLink = `/campaigns/${campaign.slug}/encounters/new`

  return <Sidebar title={'Encounters'} canAdd={campaign.canUpdate}>
    {types?.filter(type => {
      return campaign.canUpdate
        || campaign.encounters?.find(encounter => encounter.type.id === type.id)
    }).map(type => (
      <SidebarSection
        title={type.name}
        addNewLink={campaign.canUpdate ? addNewLink : undefined}
        addNewLinkState={{ type }}
        items={
          campaign.encounters?.filter(
            encounter => encounter.type.id === type.id).
            map(quest => mapEncounter(quest))}
      />
    ))
    }
  </Sidebar>
}

export default EncounterSidebar