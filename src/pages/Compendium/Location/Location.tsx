import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useLocationForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Location: FunctionComponent = () => {

  const navigate = useNavigate()

  const { locationId } = useParams() as { locationId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useLocationForm({
    locationId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/locations/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/locations`)
    },
  })

  return (
    <Post
      pageTypeName={'Location'}
      form={form}
    />
  )
}

export default Location
