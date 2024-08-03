import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useCurrencyForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'

const Currency: FunctionComponent = () => {

  const navigate = useNavigate()

  const { currencyId } = useParams() as { currencyId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useCurrencyForm({
    currencyId,
    onCreated: (data) => {
      navigate(`${compendiumPath}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/systems`)
    },
  })

  return (
    <Post
      pageTypeName={'Currency'}
      form={form}
    />
  )
}

export default Currency
