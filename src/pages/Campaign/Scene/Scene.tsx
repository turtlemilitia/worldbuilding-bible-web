import React, { FunctionComponent, JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSceneForm } from '../../../hooks/Forms'
import useUrlFormatter from '@/hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Scene: FunctionComponent = (): JSX.Element => {

  const navigate = useNavigate()

  const { campaignId, sceneId } = useParams() as { campaignId: string, sceneId: string } // router
  const { campaignPath } = useUrlFormatter()

  const form = useSceneForm({
    campaignId: fixId(campaignId),
    sceneId: fixId(sceneId),
    onCreated: (data) => {
      navigate(`${campaignPath}/scenes/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${campaignPath}/scenes`)
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
