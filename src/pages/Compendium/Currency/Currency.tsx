import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useCurrencyForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Currency: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, currencyId } = useParams() as { compendiumId:string; currencyId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useCurrencyForm({
    compendiumId: fixId(compendiumId),
    currencyId: fixId(currencyId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/currencies/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/currencies`)
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
