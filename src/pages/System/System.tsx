import React, { JSX, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearSystemData, setSystemData, updateSystemData } from '../../reducers/system/systemSlice'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import { Editor } from '../../components/Forms/Fields/Editor'
import { HeaderWrapper } from '../../components/HeaderWrapper'
import ContentWrapper from '../../components/ContentWrapper'
import { destroySystem, storeSystem, updateSystem, viewSystem } from '../../services/SystemService'
import { TCharacter, TSystem } from '../../types'
import { AxiosError } from 'axios'
import LoadingWrapper from '../../components/LoadingWrapper'
import { addSystem, removeSystem } from '../../reducers/system/systemsIndexSlice'
import FormToolbar from '../../components/Forms/FormToolbar'
import Post from '../../components/Post/component'
import { TDeityRequest } from '../../services/DeityService'
import compendium from '../Compendium/Compendium'

const System = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, systemId } = useParams() as { compendiumId: string, systemId: string } // router

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
