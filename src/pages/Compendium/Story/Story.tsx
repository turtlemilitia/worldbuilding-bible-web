import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useStoryForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Story: FunctionComponent = () => {

  const navigate = useNavigate()

  const { storyId } = useParams() as { storyId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useStoryForm({
    storyId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Story'}
      form={form}
    />
  )
}

export default Story
