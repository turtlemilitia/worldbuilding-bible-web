import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useDeityForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Deity: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, deityId } = useParams() as { compendiumId:string; deityId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useDeityForm({
    compendiumId: fixId(compendiumId),
    deityId: fixId(deityId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/deities/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/deities`)
    },
  })

  return (
    <Post
      pageTypeName={'Deity'}
      form={form}
    />
  )
}

export default Deity
