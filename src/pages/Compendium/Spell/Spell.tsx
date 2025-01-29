import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSpellForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Spell: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, spellId } = useParams() as { compendiumId:string; spellId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useSpellForm({
    compendiumId: fixId(compendiumId),
    spellId: fixId(spellId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/spells/${data.id}/${data.slug}`)
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
