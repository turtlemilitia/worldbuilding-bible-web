import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { usePlaneForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Plane: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, planeId } = useParams() as { compendiumId:string; planeId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = usePlaneForm({
    compendiumId: fixId(compendiumId),
    planeId: fixId(planeId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/planes/${data.id}/${data.slug}`)
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
