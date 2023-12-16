import React, { JSX, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearSystemData, setSystemData, updateSystemData } from '../../reducers/system/systemSlice'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import { Editor } from '../../components/Forms/Fields/Editor'
import HeaderWrapper from '../../components/HeaderWrapper'
import ContentWrapper from '../../components/ContentWrapper'
import { storeSystem, updateSystem, viewSystem } from '../../services/SystemService'
import { TSystem } from '../../types'
import { AxiosError } from 'axios'
import LoadingWrapper from '../../components/LoadingWrapper'
import { addSystem } from '../../reducers/system/systemsIndexSlice'
import FormToolbar from '../../components/Forms/FormToolbar'
import { ErrorBanner } from '../../components/Banners/ErrorBanner'

const System = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { systemId } = useParams() as { systemId: string } // router

  const navigate = useNavigate()

  const initialState: TSystem = {
    name: '',
    content: ''
  }

  const remote = useAppSelector((state: RootState) => state.system) // redux

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TSystem>(initialState)
  const [error, setError] = useState<string>()

  const isNew: boolean = systemId === 'new'

  const fetch = () => {
    setLoading(true)
    viewSystem(systemId)
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setSystemData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (systemId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearSystemData(undefined))
    }
    return () => {
      dispatch(clearSystemData(undefined))
    }
  }, [systemId])

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true)
    if (isNew) {
      storeSystem(data)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(setSystemData(response.data.data))
          dispatch(addSystem(response.data.data))
          navigate(`/systems/${response.data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateSystem(systemId, data)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateSystemData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }

    event.preventDefault()
  }

  return (
    <LoadingWrapper loading={loading}>
      <form onSubmit={submit}>
        <HeaderWrapper page="System">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: TSystem) => ({ ...prevState, name: value }))}
                          placeholder={'System Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex justify-center -mx-2">
            <div className="w-full md:w-2/4 max-w-2xl px-2">
              {/*{error && <ErrorBanner errorText={error}/>}*/}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <Editor
                initialValue={data.content}
                onChange={(value) => setData((prevState: TSystem) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the system.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default System
