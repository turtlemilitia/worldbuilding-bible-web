import React, { FunctionComponent, JSX, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useEncounterForm } from '../../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'
import useUrlFormatter from '@/hooks/useUrlFormatter'

const Encounter: FunctionComponent = (): JSX.Element => {

  const navigate = useNavigate()
  const location = useLocation()

  const { campaignId, encounterId } = useParams() as { campaignId: string, encounterId: string } // router
  const { campaignPath } = useUrlFormatter()

  const form = useEncounterForm({
    campaignId: fixId(campaignId),
    encounterId: fixId(encounterId),
    onCreated: (data) => {
      navigate(`${campaignPath}/encounters/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${campaignPath}/encounters`)
    },
  })

  useEffect(() => {
    if (location.state?.type) {
      form.onFieldChange('type', location.state.type)
    }
  }, [form.data?.type, location.state?.type])

  return (
    <Post
      pageTypeName={'Encounter'}
      form={form}
    />
  )
}

export default Encounter
