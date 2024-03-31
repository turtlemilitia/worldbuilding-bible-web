import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { StickyNoteIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign, TGenericPostList } from '../../types'
import { clearCampaignData, updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { viewCampaign } from '../../services/CampaignService'
import Menu from '../../components/Nav/Menu'
import MenuItem from '../../components/Nav/MenuItem'

const mapSession = (campaign: TCampaign, session: TGenericPostList): SidebarItemInterface => ({
  title: session.name,
  to: `/campaigns/${campaign?.slug}/sessions/${session.slug}`,
  icon: (props) => <StickyNoteIcon {...props}/>,
})

const CampaignsWrapper = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const { campaignId } = useParams() as { campaignId: string } // router

  const dispatch = useAppDispatch()

  const isNew = (): boolean => campaignId === 'new'

  useEffect(() => {
    if (!isNew()) {
      viewCampaign(campaignId, { include: 'sessions;compendium' })
        .then(({ data }) => {
          dispatch(updateCampaignData(data.data))
        })
    }
    return () => {
      dispatch(clearCampaignData(undefined))
    }
  }, [campaignId])

  return (
    <>
      {campaign && (
        <div className="fixed top-16 w-full z-40">
          <Menu>
            {[
              {
                title: 'The Campaign',
                to: `/campaigns/${campaignId}`
              },
              {
                title: 'Compendium',
                to: `/campaigns/${campaignId}/compendia/${campaign.compendium?.slug}`,
                hide: !campaign.compendium
              },
              {
                title: 'Quests',
                to: `/campaigns/${campaignId}/quests`
              },
              {
                title: 'Encounters',
                to: `/campaigns/${campaignId}/encounters`
              },
              {
                title: 'Sessions',
                to: `/campaigns/${campaignId}/sessions`
              }
            ].map((menuItem, index) => (
              <MenuItem
                key={index}
                menuItem={menuItem}
                className="uppercase font-sans-serif tracking-widest text-sm hover:text-red-600"
                activeClassName="text-red-600"
              />
            ))}
          </Menu>
        </div>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CampaignsWrapper