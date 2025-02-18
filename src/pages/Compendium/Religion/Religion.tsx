import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useReligionForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Religion: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, religionId } = useParams() as { compendiumId:string; religionId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useReligionForm({
    compendiumId: fixId(compendiumId),
    religionId: fixId(religionId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/religions/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/religions`)
    },
  })

  return (
    <Post
      pageTypeName={'Religion'}
      form={form}
    />
  )
}

export default Religion
