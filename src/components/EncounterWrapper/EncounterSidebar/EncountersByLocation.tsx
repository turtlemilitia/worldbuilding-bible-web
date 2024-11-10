import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'
import React, { useMemo } from 'react'
import { TCampaign, TLocation } from '@/types'
import useCampaignsMapping from '@/hooks/useCampaignsMapping'
import { isEmpty } from 'lodash'

type TOwmProps = {
  campaign: TCampaign;
  addNewLink: string;
  encounters: TCampaign['encounters']
}
const EncountersByLocation = ({ campaign, addNewLink, encounters }: TOwmProps) => {

  const { mapEncounter } = useCampaignsMapping({ campaignId: campaign.slug })

  const locations = useMemo(() => {
    // Use a Map to keep track of unique locations by ID
    const uniqueLocationsMap = new Map<number, TLocation>();

    encounters.forEach(encounter => {
      encounter.locations.forEach(location => {
        uniqueLocationsMap.set(location.id, location);
      });
    });

    // Convert the Map back to an array
    return Array.from(uniqueLocationsMap.values());
  }, [encounters]);

  return <>
    <SidebarSection
      title={''}
      addNewLink={campaign.canUpdate ? addNewLink : undefined}
      items={
        createNestedArray(
          encounters?.filter(encounter => isEmpty(encounter.locations)),
        ).
          map(encounter => mapEncounter(encounter))
      }
    />
    {locations?.filter(location => {
      return campaign.canUpdate ||
        encounters?.find(encounter => encounter.locations.find(encounterLocation => encounterLocation.id === location.id))
    }).map(location => (
      <SidebarSection
        title={location.name}
        addNewLink={campaign.canUpdate ? addNewLink : undefined}
        addNewLinkState={{ location }}
        items={
          createNestedArray(
            encounters?.filter(encounter => encounter.locations.find(encounterLocation => encounterLocation.id === location.id)),
          ).
            map(encounter => mapEncounter(encounter))
        }
      />
    ))}
  </>
}

export default EncountersByLocation