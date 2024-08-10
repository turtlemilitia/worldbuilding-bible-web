import React, { JSX, useEffect, useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCampaignDataManager, useCompendiumDataManager, useNotebookDataManager } from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'
import { campaignIncludes } from '../../hooks/Forms/useCampaignForm/useCampaignForm'
import { compendiumIncludes } from '../../hooks/Forms/useCompendiumForm/useCompendiumForm'
import { notebookIncludes } from '../../hooks/Forms/useNotebookForm/useNotebookForm'

const CampaignWrapper = (): JSX.Element => {

  const { campaign, view, clearData } = useCampaignDataManager() // redux
  const { compendium, view: viewCompendium, clearData: clearCompendiumData } = useCompendiumDataManager() // redux
  const { notebook, view: viewNotebook, clearData: clearNotebook } = useNotebookDataManager()

  const { campaignId, compendiumId } = useParams() as { campaignId: string; compendiumId?: string } // router

  const notACompendiumPage = useMemo(() => !compendiumId, [compendiumId])

  useEffect(() => {
    if (campaignId !== 'new') {
      view(campaignId, { include: campaignIncludes })
    }
    return () => {
      clearData(campaignId)
    }
  }, [campaignId])

  useEffect(() => {
    if (campaign?.compendium?.slug) {
      viewCompendium(campaign?.compendium?.slug, { include: compendiumIncludes })
    }
    return () => {
      if (compendium) {
        clearCompendiumData(compendium?.slug)
      }
    }
  }, [campaign?.compendium?.slug])

  useEffect(() => {
    if (notACompendiumPage && campaign?.notebook) {
      viewNotebook(campaign.notebook.slug, { include: notebookIncludes })
    }
    return () => {
      if (notACompendiumPage && !campaign?.notebook && notebook) {
        clearNotebook(notebook.slug)
      }
    }
  }, [notACompendiumPage, compendium?.notebook])

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