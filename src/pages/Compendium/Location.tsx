import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import { TLocation } from '../../types'
import ContentWrapper from '../../components/ContentWrapper'
import Editor from '../../components/Forms/Fields/Editor'
import { storeLocation, TLocationRequest, updateLocation, viewLocation } from '../../services/LocationService'
import {
  clearLocationData,
  setLocationData,
  updateLocationData
} from '../../reducers/compendium/location/locationSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import LocationInfoBar from './LocationInfoBar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import {
  addCompendiumLocationData,
  setCompendiumData,
  updateCompendiumData, updateCompendiumLocationData
} from '../../reducers/compendium/compendiumSlice'

const Location: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, locationId } = useParams() as { compendiumId: string; locationId: string } // router

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(false)
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = locationId === 'new'

  const include = 'type,governmentType,parent'

  const fetch = (): void => {
    setLoading(true)
    viewLocation(locationId, { include })
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setLocationData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (locationId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearLocationData(undefined))
    }
    return () => {
      dispatch(clearLocationData(undefined))
    }
  }, [locationId])

  const validate = (): boolean => {
    if (!data.name || !data.content || !data.type) {
      setError('Validation failed')
      return false
    }
    return true
  }

  const readyDataForRequest = (data: any): TLocationRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
    aliases: data.aliases,
    demonym: data.demonym,
    population: data.population,
    governmentTypeId: data.governmentType?.id,
    parentId: data.parent?.id,
  })

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    setLoading(true)
    const validated = readyDataForRequest(data)
    if (isNew) {
      storeLocation(compendiumId, validated, { include })
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setLocationData(data.data))
          dispatch(addCompendiumLocationData(data.data))
          navigate(`/compendia/${compendiumId}/locations/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateLocation(locationId, validated, { include })
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateLocationData(response.data.data))
          dispatch(updateCompendiumLocationData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Location">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                          placeholder={'Location Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-3">
            <div className="w-full lg:w-1/4 px-3">
              <LocationInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: any) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-3">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <Editor
                key={locationId}
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the location.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default Location
