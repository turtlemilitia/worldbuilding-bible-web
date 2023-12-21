import React, { FunctionComponent, JSX } from 'react'
import { storeDeity, TDeityRequest, updateDeity, viewDeity } from '../../services/DeityService'
import {
  clearDeityData,
  setDeityData,
  updateDeityData
} from '../../reducers/compendium/deity/deitySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TDeity } from '../../types'

const Deity: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, deityId } = useParams() as { compendiumId: string; deityId: string } // router

  const { deity } = useAppSelector((state: RootState) => state.deity) // redux

  const navigate = useNavigate()

  const isNew: boolean = deityId === 'new'

  const reset = () => dispatch(clearDeityData(undefined))

  const fetch = async () => {
    if (deityId && !isNew) {
      await viewDeity(deityId, { include: 'compendium' })
        .then(response => {
          dispatch(setDeityData(response.data.data))
        })
    }
    if (isNew) {
      dispatch(clearDeityData(undefined))
    }
  }

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TDeity> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeDeity(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setDeityData(data.data))
          dispatch(addCompendiumChildData({ field: 'deities', data: data.data }))
          navigate(`/compendia/${compendiumId}/deities/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateDeity(deityId, validated)
        .then(({ data }) => {
          dispatch(updateDeityData(data.data))
          dispatch(updateCompendiumChildData({ field: 'deities', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={deityId}
      initialValues={deity as TDeity}
      onSubmit={submit}
      onFetch={fetch}
      fields={[]}
      ready={true}
      resetData={reset}
    />
  )
}

export default Deity
