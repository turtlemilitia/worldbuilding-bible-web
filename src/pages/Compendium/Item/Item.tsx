import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useItemForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Item: FunctionComponent = () => {

  const navigate = useNavigate()

  const { itemId } = useParams() as { itemId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useItemForm({
    itemId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Item'}
      form={form}
    />
  )
}

export default Item
