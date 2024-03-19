import { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { BookIcon, StickyNoteIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign, TSession } from '../../types'
import { clearCampaignData, setCampaignData, updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { viewCampaign } from '../../services/CampaignService'
import LoadingWrapper from '../../components/LoadingWrapper'
import { indexSessions } from '../../services/SessionService'

const mapSession = (campaign: TCampaign, session: TSession): SidebarItemInterface => ({
  title: session.name,
  to: `/campaigns/${campaign?.slug}/sessions/${session.slug}`,
  icon: (props) => <StickyNoteIcon {...props}/>,
})

const CampaignsWrapper = (): JSX.Element => {

  const { campaign, loading } = useAppSelector((state: RootState) => state.campaign) // redux

  const { campaignId } = useParams() as { campaignId: string } // router

  const dispatch = useAppDispatch();

  const isNew = (): boolean => campaignId === 'new'

  useEffect(() => {
    if (!loading && !isNew()) {
      viewCampaign(campaignId, { include: 'users;invitations' })
        .then(({ data }) => {
          dispatch(setCampaignData(data))
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
                hasChildren: campaign.hasSessions,
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
        <LoadingWrapper loading={loading}>
          <Outlet/>
        </LoadingWrapper>
      </div>
    </>
  )
}

export default CampaignsWrapper