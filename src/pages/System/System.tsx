import React, { JSX, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearSystemData, setSystemData, updateSystemData } from '../../reducers/system/systemSlice'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import { Editor } from '../../components/Forms/Fields/Editor'
import { HeaderWrapper } from '../../components/HeaderWrapper'
import ContentWrapper from '../../components/ContentWrapper'
import { storeSystem, updateSystem, viewSystem } from '../../services/SystemService'
import { TCharacter, TSystem } from '../../types'
import { AxiosError } from 'axios'
import LoadingWrapper from '../../components/LoadingWrapper'
import { addSystem } from '../../reducers/system/systemsIndexSlice'
import FormToolbar from '../../components/Forms/FormToolbar'
import Post from '../../components/Post/component'
import { TDeityRequest } from '../../services/DeityService'

const System = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { systemId } = useParams() as { systemId: string } // router

  const navigate = useNavigate()

  const { system } = useAppSelector((state: RootState) => state.system) // redux

  const isNew: boolean = systemId === 'new'

  const submit = useCallback((data: TSystem) => {
    if (isNew) {
      return storeSystem(data)
        .then(({ data }) => {
          dispatch(addSystem(data.data))
          navigate(`/systems/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateSystem(systemId, data)
        .then(({ data }) => {
          dispatch(updateSystemData(data.data))
          return data.data
        })
    }
  }, [dispatch, navigate])

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={systemId}
      isNew={isNew}
      ready={true}
      remoteData={system as TSystem}
      onSave={submit}
      onFetch={() => viewSystem(systemId).then(({data}) => data.data)}
      fields={[]}
      setRemoteData={(data) => dispatch(updateSystemData(data))}
      resetData={() => dispatch(clearSystemData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default System
