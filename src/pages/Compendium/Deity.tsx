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

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TDeity> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeDeity(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'deities', data: data.data }))
          navigate(`/compendia/${compendiumId}/deities/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateDeity(deityId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'deities', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={deityId}
      isNew={isNew}
      remoteData={deity as TDeity}
      onSave={submit}
      onFetch={() => viewDeity(deityId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      ready={true}
      resetData={() => dispatch(clearDeityData(undefined))}
      setRemoteData={(data) => dispatch(setDeityData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Deity
