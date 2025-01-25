import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useConceptForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Concept: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, conceptId } = useParams() as { compendiumId: string; conceptId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useConceptForm({
    compendiumId: fixId(compendiumId),
    conceptId: fixId(conceptId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/concepts/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/concepts`)
    },
  })

  return (
    <Post
      pageTypeName={'Concept'}
      form={form}
    />
  )
}

export default Concept
