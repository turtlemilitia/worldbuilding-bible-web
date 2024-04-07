import React, { FunctionComponent, JSX } from 'react'
import { destroyDeity, storeDeity, TDeityRequest, updateDeity, viewDeity } from '../../services/DeityService'
import {
  clearDeityData,
  setDeityData,
  updateDeityData
} from '../../reducers/compendium/deity/deitySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TDeity } from '../../types'
import useUrlFormatter from '../../utils/hooks/useUrlFormatter'

const Deity: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, deityId } = useParams() as { compendiumId: string; deityId: string } // router

  const { deity } = useAppSelector((state: RootState) => state.deity) // redux

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={deityId}
      isNew={deityId === 'new'}
      pageTypeName={'Deity'}
      pathToNew={(data) => `${compendiumPath}/deities/${data.slug}`}
      pathAfterDelete={compendiumPath}
      canEdit={deity.canUpdate}
      canDelete={deity.canDelete}
      ready={true}

      onFetch={() => viewDeity(deityId).then(({ data }) => data.data)}
      onCreate={(data: TDeityRequest) => storeDeity(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TDeityRequest) => updateDeity(deityId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyDeity(deityId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'deities', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'deities', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'deities', id: deityId }))
      }}

      fields={[]}

      persistedData={deity as TDeity}
      setPersistedData={(data) => dispatch(setDeityData(data))}
      updatePersistedData={(data) => dispatch(updateDeityData(data))}
      resetPersistedData={() => dispatch(clearDeityData(undefined))}
    />
  )
}

export default Deity
