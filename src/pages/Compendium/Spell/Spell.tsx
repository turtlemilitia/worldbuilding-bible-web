import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSpellForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Spell: FunctionComponent = () => {

  const navigate = useNavigate()

  const { spellId } = useParams() as { spellId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useSpellForm({
    spellId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/spells/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/spells`)
    },
  })

  return (
    <Post
      pageTypeName={'Spell'}
      form={form}
    />
  )
}

export default Spell
