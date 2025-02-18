import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useItemForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Item: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, itemId } = useParams() as { compendiumId: string, itemId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useItemForm({
    compendiumId: fixId(compendiumId),
    itemId: fixId(itemId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/items/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/items`)
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
