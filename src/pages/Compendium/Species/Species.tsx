import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSpeciesForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Species: FunctionComponent = () => {

  const navigate = useNavigate()

  const { speciesId } = useParams() as { speciesId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useSpeciesForm({
    speciesId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/species/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/species`)
    },
  })

  return (
    <Post
      pageTypeName={'Species'}
      form={form}
    />
  )
}

export default Species
