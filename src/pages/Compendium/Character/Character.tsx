import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useCharacterForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Character: FunctionComponent = () => {

  const navigate = useNavigate()

  const { characterId } = useParams() as { characterId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useCharacterForm({
    characterId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Character'}
      form={form}
    />
  )
}

export default Character
