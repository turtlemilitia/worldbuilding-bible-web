import React, { FunctionComponent, useEffect } from 'react'
import BoxWithTitle from '../BoxWithTitle'
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import CampaignInvitationService
  from '../../services/ApiService/Campaigns/CampaignInvitationService'
import LoadingSpinner from '../LoadingSpinner'
import { RootState } from '@/store'
import useErrorHandling from '../../hooks/useErrorHandling'
import { ErrorBanner } from '../Banners/ErrorBanner'
import { TInvitation } from '@/types'

const ConfirmInvitationForm: FunctionComponent = () => {

  const { token: isLoggedIn } = useAppSelector((state: RootState) => state.auth) // redux

  const { campaignId, token } = useParams() as {
    campaignId: string,
    token: string
  }
  const invitation = useLoaderData() as TInvitation

  const navigate = useNavigate()
  const location = useLocation()

  const { errors, handleResponseErrors, hasErrors } = useErrorHandling()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/register', { state: { redirectTo: location, email: invitation.email } })
    } else {
      CampaignInvitationService.confirm(campaignId, token)
        .then(() => {
          navigate(`/campaigns/${campaignId}`)
        })
        .catch((err) => handleResponseErrors(err, 'Invitation failed. Please try again.'))
    }
  }, [])

  return (
    <BoxWithTitle title={'Confirming'}
                  subTitle={'Wait, while we check your details'}>
      {!hasErrors ? (
        <div className={'flex justify-center'}>
          <LoadingSpinner size={30}/>
        </div>
      ) : (
        <ErrorBanner errors={errors}/>
      )}
    </BoxWithTitle>
  )
}

export default ConfirmInvitationForm