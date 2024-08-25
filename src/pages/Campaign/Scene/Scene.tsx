import React, { FunctionComponent, JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSceneForm } from '../../../hooks/Forms'

const Scene: FunctionComponent = (): JSX.Element => {

  const navigate = useNavigate()

  const { campaignId, sceneId } = useParams() as { campaignId: string, sceneId: string } // router

  const form = useSceneForm({
    sceneId,
    onCreated: (data) => {
      navigate(`/campaigns/${campaignId}/scenes/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaigns/${campaignId}/scenes`)
    },
  })

  return (
    <Post
      pageTypeName={'Scene'}
      form={form}
    />
  )
}

export default Scene
