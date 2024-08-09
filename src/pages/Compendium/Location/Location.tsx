import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useLocationForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Location: FunctionComponent = () => {

  const navigate = useNavigate()
  const { state } = useLocation()
  console.log({ state })

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

  useEffect(() => {
    if (state?.parent && form.data?.parent?.id !== state?.parent.id) {
      form.onFieldChange('parent', state.parent)
    }
  }, [form.data?.parent, state?.parent])

  return (
    <Post
      pageTypeName={'Location'}
      form={form}
    />
  )
}

export default Location
