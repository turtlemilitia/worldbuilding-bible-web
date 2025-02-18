import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useFactionForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Faction: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, factionId } = useParams() as { compendiumId:string; factionId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useFactionForm({
    compendiumId: fixId(compendiumId),
    factionId: fixId(factionId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/factions/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/factions`)
    },
  })

  return (
    <Post
      pageTypeName={'Faction'}
      form={form}
    />
  )
}

export default Faction
