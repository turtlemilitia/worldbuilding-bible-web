import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useReligionForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Religion: FunctionComponent = () => {

  const navigate = useNavigate()

  const { religionId } = useParams() as { religionId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useReligionForm({
    religionId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Religion'}
      form={form}
    />
  )
}

export default Religion
