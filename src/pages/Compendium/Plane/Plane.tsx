import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { usePlaneForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Plane: FunctionComponent = () => {

  const navigate = useNavigate()

  const { planeId } = useParams() as { planeId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = usePlaneForm({
    planeId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/planes/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/planes`)
    },
  })

  return (
    <Post
      pageTypeName={'Plane'}
      form={form}
    />
  )
}

export default Plane
