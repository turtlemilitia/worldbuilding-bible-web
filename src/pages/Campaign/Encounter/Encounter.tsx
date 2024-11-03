import React, { FunctionComponent, JSX, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useEncounterForm } from '../../../hooks/Forms'

const Encounter: FunctionComponent = (): JSX.Element => {

  const navigate = useNavigate()
  const location = useLocation()

  const { campaignId, encounterId } = useParams() as { campaignId: string, encounterId: string } // router

  const form = useEncounterForm({
    encounterId,
    onCreated: (data) => {
      navigate(`/campaigns/${campaignId}/encounters/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaigns/${campaignId}/encounters`)
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
