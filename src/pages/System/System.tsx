import React, { FunctionComponent } from 'react'
import Post from '../../components/Post'
import { useNavigate, useParams } from 'react-router-dom'
import { useSystemForm } from '../../hooks/Forms'

const System: FunctionComponent = () => {

  const navigate = useNavigate()

  const { systemId } = useParams() as { systemId: string }

  const form = useSystemForm({
    systemId,
    onCreated: (data) => {
      navigate(`/systems/${data.slug}`)
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
