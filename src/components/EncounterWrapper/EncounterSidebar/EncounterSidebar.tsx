import React, { FunctionComponent, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { TEncounterSidebarProps } from './types'
import { Button } from '@/components/Forms/Fields/Button'
import { MapPinIcon } from 'lucide-react'
import EncountersByType
  from '@/components/EncounterWrapper/EncounterSidebar/EncountersByType'
import EncountersByLocation
  from '@/components/EncounterWrapper/EncounterSidebar/EncountersByLocation'

const EncounterSidebar: FunctionComponent<TEncounterSidebarProps> = ({ campaign }) => {

  const [orderBy, setOrderBy] = useState<'location' | null>(null)

  const addNewLink = `/campaigns/${campaign.slug}/encounters/new`

  const filters = []
  if (campaign.canUpdate) {
    filters.push(
      <Button
        size={'icon'}
        variant={orderBy === 'location' ? 'primary' : 'ghost'}
        className={'block text-stone-300 text-center content-center'}
        onClick={() => setOrderBy(
          prevState => prevState !== 'location' ? 'location' : null)}
      >
        <MapPinIcon size={20} className="inline-block"/>
      </Button>,
    )
  }

  return <Sidebar
    title={'Encounters'}
    canAdd={campaign.canUpdate}
    filters={filters}
  >
    {orderBy === 'location' ? (
      <EncountersByLocation
        campaign={campaign}
        addNewLink={addNewLink}
        encounters={campaign.encounters}/>
    ) : (
      <EncountersByType
        campaign={campaign}
        addNewLink={addNewLink}
        encounters={campaign.encounters}/>
    )}
  </Sidebar>
}

export default EncounterSidebar