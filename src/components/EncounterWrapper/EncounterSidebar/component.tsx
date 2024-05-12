import React, { FunctionComponent, useContext } from 'react'
import Sidebar, { SidebarItemInterface } from '../../Sidebar/Sidebar'
import { TEncounterSidebarProps } from './types'
import { SwordsIcon } from 'lucide-react'
import useCampaignsMapping from '../../../hooks/useCampaignsMapping'
import { EncounterWrapperContext } from '../component'

const EncounterSidebar: FunctionComponent<TEncounterSidebarProps> = ({ campaign }) => {

  const { mapEncounter } = useCampaignsMapping({ campaignId: campaign.slug })

  const types = useContext(EncounterWrapperContext)

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