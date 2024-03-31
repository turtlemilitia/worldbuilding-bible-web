import { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { BookIcon, StickyNoteIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign, TGenericPostList } from '../../types'
import { clearCampaignData, updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { viewCampaign } from '../../services/CampaignService'
import { indexSessions } from '../../services/SessionService'

const mapSession = (campaign: TCampaign, session: TGenericPostList): SidebarItemInterface => ({
  title: session.name,
  to: `/campaigns/${campaign?.slug}/sessions/${session.slug}`,
  icon: (props) => <StickyNoteIcon {...props}/>,
})

const CampaignsWrapper = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const { campaignId } = useParams() as { campaignId: string } // router

  const dispatch = useAppDispatch();

  const isNew = (): boolean => campaignId === 'new'

  useEffect(() => {
    if (!isNew()) {
      viewCampaign(campaignId, { include: 'sessions' })
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
        <Sidebar
          title={'Campaign'}
          items={
            [
              {
                title: 'Sessions',
                addNewLink: `/campaigns/${campaign.slug}/sessions/new`,
                icon: (props) => <BookIcon {...props}/>,
                children: campaign.sessions?.map(session => mapSession(campaign, session)),
                loadChildren: () => {
                  indexSessions(campaign.slug)
                    .then(({ data }) => {
                      dispatch(updateCampaignData({sessions: data.data}))
                    })
                }
              }
            ]
          }/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CampaignsWrapper