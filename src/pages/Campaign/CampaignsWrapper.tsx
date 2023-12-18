import { JSX, useEffect, useState } from 'react'
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

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const { campaignId } = useParams() as { campaignId: string } // router

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false)

  const isNew = (): boolean => campaignId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewCampaign(campaignId)
      .then(response => {
        setLoading(false)
        dispatch(setCampaignData(response.data.data))
      })
  }

  useEffect(() => {
    if (campaignId && !isNew()) {
      fetch()
    }
    if (isNew()) {
      dispatch(clearCampaignData(undefined))
    }
  }, [campaignId])

  return (
    <>
      {campaignId !== 'new' && (
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