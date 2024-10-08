import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { usePantheonForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Pantheon: FunctionComponent = () => {

  const navigate = useNavigate()

  const { pantheonId } = useParams() as { pantheonId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = usePantheonForm({
    pantheonId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/pantheons/${data.slug}`)
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
