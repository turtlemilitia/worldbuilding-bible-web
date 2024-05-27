import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TSession } from '../../../types'
import {
  addCampaignChildData,
  removeCampaignChildData,
  updateCampaignChildData
} from '../../../reducers/campaign/campaignSlice'
import { useEffect, useMemo } from 'react'
import { setSessionData, updateSessionData } from '../../../reducers/campaign/session/sessionSlice'

const useSessionPageData = () => {

  const { campaignId, sessionId } = useParams() as { campaignId: string; sessionId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux]
  const { session: persistedData } = useAppSelector((state: RootState) => state.session) // redux]

  const isNew: boolean = useMemo(() => sessionId === 'new', [sessionId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  const nextSessionNumber = useMemo(
    () => campaign?.sessions.reduce((prev, { session_number }) => ((prev ? prev : Number(session_number)) + 1), 0),
    [campaign?.sessions]
  )

  useEffect(() => {
    if (isNew) {
      dispatch(setSessionData({
        name: `Session ${nextSessionNumber}`,
        session_number: nextSessionNumber,
        scheduled_at: new Date().toISOString().substring(0, 10)
      }))
    }
  }, [sessionId])

  return {
    isNew,
    canEdit,
    campaignId,
    sessionId,
    persistedData,
    setPersistedData: (data?: TSession) => dispatch(setSessionData(data)),
    updatePersistedData: (data: Partial<TSession>) => dispatch(updateSessionData(data)),
    resetPersistedData: () => dispatch(setSessionData(undefined)),
    onCreated: (data: TSession) => {
      dispatch(addCampaignChildData({ field: 'sessions', data: data }))
      navigate(`/campaigns/${campaignId}/sessions/${data?.slug}`)
    },
    onUpdated: (data: TSession) => {
      dispatch(updateCampaignChildData({ field: 'sessions', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCampaignChildData({ field: 'sessions', id: sessionId }))
      navigate(`/campaigns/${campaignId}`)
    },
  }

}

export default useSessionPageData
