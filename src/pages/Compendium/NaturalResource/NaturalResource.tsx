import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useNaturalResourceForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const NaturalResource: FunctionComponent = () => {

  const navigate = useNavigate()

  const { naturalResourceId } = useParams() as { naturalResourceId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useNaturalResourceForm({
    naturalResourceId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'NaturalResource'}
      form={form}
    />
  )
}

export default NaturalResource
