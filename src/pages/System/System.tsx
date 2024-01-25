import React, { JSX } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearSystemData, setSystemData, updateSystemData } from '../../reducers/system/systemSlice'
import { destroySystem, storeSystem, updateSystem, viewSystem } from '../../services/SystemService'
import { TSystem } from '../../types'
import { addSystem, removeSystem } from '../../reducers/system/systemsIndexSlice'
import Post from '../../components/Post/component'

const System = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { systemId } = useParams() as { systemId: string } // router

  const { system } = useAppSelector((state: RootState) => state.system) // redux

  const readyDataForRequest = (data: any): TSystem => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={systemId}
      isNew={systemId === 'new'}
      pathToNew={(data: TSystem) => `/systems/${data.slug}`}
      pathAfterDelete={`/`}
      ready={true}

      onFetch={() => viewSystem(systemId).then(({ data }) => data.data)}
      onCreate={(data: TSystem) => storeSystem(readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TSystem) => updateSystem(systemId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroySystem(systemId)}
      onCreated={(data: TSystem) => {
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
