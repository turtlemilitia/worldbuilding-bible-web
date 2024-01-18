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

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={deityId}
      isNew={deityId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/deities/${data.slug}`}
      ready={true}

      onCreate={(data: TDeityRequest) => storeDeity(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TDeityRequest) => updateDeity(deityId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'deities', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'deities', data: data }))
      }}
      onFetch={() => viewDeity(deityId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={deity as TDeity}
      setPersistedData={(data) => dispatch(setDeityData(data))}
      updatePersistedData={(data) => dispatch(updateDeityData(data))}
      resetPersistedData={() => dispatch(clearDeityData(undefined))}
    />
  )
}

export default Deity
