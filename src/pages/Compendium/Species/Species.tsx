import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSpeciesForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Species: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, speciesId } = useParams() as { compendiumId: string; speciesId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useSpeciesForm({
    compendiumId: fixId(compendiumId),
    speciesId: fixId(speciesId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/species/${data.id}/${data.slug}`)
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
