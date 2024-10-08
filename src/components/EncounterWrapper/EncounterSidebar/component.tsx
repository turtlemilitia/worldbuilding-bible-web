import React, { FunctionComponent } from 'react'
import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import { TEncounterSidebarProps } from './types'
import { SwordsIcon } from 'lucide-react'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import { useEncounterTypeIndexDataManager } from '../../../hooks/DataManagers'

const EncounterSidebar: FunctionComponent<TEncounterSidebarProps> = ({ campaign }) => {

  const { mapEncounter } = useCampaignsMapping({ campaignId: campaign.slug })

  const { encounterTypes: types } = useEncounterTypeIndexDataManager();

  const items: SidebarItemInterface[] = types?.map(type => ({
    title: type.name,
    addNewLink: `/campaigns/${campaign.slug}/encounters/new`,
    addNewLinkState: { type: type.id },
    icon: (props) => <SwordsIcon {...props}/>,
    children: campaign.encounters?.filter(encounter => encounter.type.id === type.id).map(encounter => mapEncounter(encounter)) ?? []
  })) ?? []

  return <Sidebar title={'Encounters'} items={items}/>
}

export default EncounterSidebar