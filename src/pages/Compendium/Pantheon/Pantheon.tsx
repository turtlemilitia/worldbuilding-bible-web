import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { usePantheonForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Pantheon: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, pantheonId } = useParams() as { compendiumId:string; pantheonId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = usePantheonForm({
    compendiumId: fixId(compendiumId),
    pantheonId: fixId(pantheonId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/pantheons/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/pantheons`)
    },
  })

  return (
    <Post
      pageTypeName={'Pantheon'}
      form={form}
    />
  )
}

export default Pantheon
