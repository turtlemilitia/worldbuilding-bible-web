import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useStoryForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Story: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, storyId } = useParams() as { compendiumId:string; storyId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useStoryForm({
    compendiumId: fixId(compendiumId),
    storyId: fixId(storyId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/stories/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/stories`)
    },
  })

  return (
    <Post
      pageTypeName={'Lore & History'}
      form={form}
    />
  )
}

export default Story
