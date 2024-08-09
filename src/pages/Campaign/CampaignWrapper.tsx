import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCampaignDataManager, useCompendiumDataManager } from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'

const CampaignWrapper = (): JSX.Element => {

  const { campaign, view, clearData } = useCampaignDataManager() // redux
  const { compendium, view: viewCompendium, clearData: clearCompendiumData } = useCompendiumDataManager() // redux

  const { campaignId } = useParams() as { campaignId: string } // router

  useEffect(() => {
    if (campaignId !== 'new') {
      view(campaignId, { include: 'compendium;quests;quests.type;quests.parent;encounters;encounters.type;sessions' })
    }
    return () => {
      clearData(campaignId)
    }
  }, [campaignId])

  useEffect(() => {
    if (campaign?.compendium?.slug) {
      viewCompendium(campaign?.compendium?.slug, { include: 'characters;concepts;currencies;deities;factions;items;languages;locations;locations.parent;naturalResources;pantheons;planes;religions;species;spells;stories' })
    }
    return () => {
      if (compendium) {
        clearCompendiumData(compendium?.slug)
      }
    }
  }, [campaign?.compendium?.slug])

  return (
    <>
      {campaign && (
        <CampaignMenu campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CampaignWrapper