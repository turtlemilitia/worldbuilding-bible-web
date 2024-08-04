import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useDeityForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Deity: FunctionComponent = () => {

  const navigate = useNavigate()

  const { deityId } = useParams() as { deityId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useDeityForm({
    deityId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/deities/${data.slug}`)
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
