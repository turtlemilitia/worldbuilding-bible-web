import React, { FunctionComponent } from 'react'
import Post from '../../components/Post'
import { useNavigate, useParams } from 'react-router-dom'
import { useSystemForm } from '../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'

const System: FunctionComponent = () => {

  const navigate = useNavigate()

  const { systemId } = useParams() as { systemId: string }

  const form = useSystemForm({
    systemId: fixId(systemId),
    onCreated: (data) => {
      navigate(`/systems/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/systems`)
    },
  });

  return (
    <Post
      pageTypeName={'System'}
      form={form}
    />
  )
}

export default System
