import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useLocationForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Location: FunctionComponent = () => {

  const navigate = useNavigate()
  const { state } = useLocation()

  const { compendiumId, locationId } = useParams() as { compendiumId:string; locationId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useLocationForm({
    compendiumId: fixId(compendiumId),
    locationId: fixId(locationId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/locations/${data.id}/${data.slug}`)
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
