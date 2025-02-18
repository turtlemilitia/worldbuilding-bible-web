import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useNaturalResourceForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const NaturalResource: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, naturalResourceId } = useParams() as { compendiumId:string; naturalResourceId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useNaturalResourceForm({
    compendiumId: fixId(compendiumId),
    naturalResourceId: fixId(naturalResourceId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/natural-resources/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/natural-resources`)
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
