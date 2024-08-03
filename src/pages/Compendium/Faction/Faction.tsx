import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useFactionForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Faction: FunctionComponent = () => {

  const navigate = useNavigate()

  const { factionId } = useParams() as { factionId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useFactionForm({
    factionId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
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
