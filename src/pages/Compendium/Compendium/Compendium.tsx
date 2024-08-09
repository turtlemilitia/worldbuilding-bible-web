import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { TCompendium } from '../../../types'
import { useCompendiumForm } from '../../../hooks/Forms'

const Compendium: FunctionComponent = () => {

  const navigate = useNavigate()

  const {compendiumId} = useParams() as { compendiumId: string } // router

  const form = useCompendiumForm({
    compendiumId,
    onCreated: (data: TCompendium) => {
      navigate(`/compendia/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/`)
    },
  });

  return (
    <Post
      pageTypeName={'Compendium'}
      form={form}
    />
  )
}

export default Compendium
