import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useCharacterForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Character: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, characterId } = useParams() as { compendiumId: string; characterId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useCharacterForm({
    compendiumId: fixId(compendiumId),
    characterId: fixId(characterId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/characters/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/characters`)
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
