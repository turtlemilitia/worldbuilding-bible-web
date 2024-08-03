import React, { FunctionComponent, JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useEncounterForm } from '../../../hooks/Forms'

const Encounter: FunctionComponent = (): JSX.Element => {

  const navigate = useNavigate()

  const { campaignId, encounterId } = useParams() as { campaignId: string, encounterId: string } // router

  const form = useEncounterForm({
    encounterId,
    onCreated: (data) => {
      navigate(`/campaign/${campaignId}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaign/${campaignId}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Encounter'}
      form={form}
    />
  )
}

export default Encounter
