import React, { JSX } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearSystemData, setSystemData, updateSystemData } from '../../reducers/system/systemSlice'
import { destroySystem, storeSystem, TSystemRequest, updateSystem, viewSystem } from '../../services/SystemService'
import { TSystem } from '../../types'
import { addSystem, removeSystem } from '../../reducers/system/systemsIndexSlice'
import Post from '../../components/Post/Post'

const System = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { systemId } = useParams() as { systemId: string } // router

  const { system } = useAppSelector((state: RootState) => state.system) // redux

  const readyDataForRequest = (data: any): TSystemRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={systemId}
      isNew={systemId === 'new'}
      pageTypeName={'System'}
      pathToNew={(data) => `/systems/${data.slug}`}
      pathAfterDelete={`/`}
      canEdit={system && system.canUpdate}
      canDelete={system && system.canDelete}
      ready={true}

      onFetch={() => viewSystem(systemId).then(({ data }) => data.data)}
      onCreate={(data: TSystem) => storeSystem(readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TSystem) => updateSystem(systemId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroySystem(systemId)}
      onCreated={(data) => {
        dispatch(addSystem(data))
      }}
      onDeleted={() => {
        dispatch(removeSystem({ id: systemId }))
      }}

      fields={[]}

      persistedData={system as TSystem}
      setPersistedData={(data) => dispatch(setSystemData(data))}
      updatePersistedData={(data) => dispatch(updateSystemData(data))}
      resetPersistedData={() => dispatch(clearSystemData(undefined))}
    />
  )
}

export default System
