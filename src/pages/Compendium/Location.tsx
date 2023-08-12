import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import { TLocation } from '../../types'
import ContentWrapper from '../../components/ContentWrapper'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
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

const Location: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, locationId } = useParams() as { compendiumId: string; locationId: string } // router

  const remote = useAppSelector((state: RootState) => state.location) // redux

  const navigate = useNavigate()

  const initialState: TLocation = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(false)
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = locationId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewLocation(locationId)
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

  const validateData = (): TLocationRequest | void => {
    if (!data.name || !data.content || !data.type || !data.compendium || !data.parent) {
      return
    }
    return {
      name: data.name,
      content: data.content,
      type: data.type.id,
      compendium: data.compendium.id,
      parent: data.parent.id,
    }
  }

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true)
    const validated = validateData()
    if (validated) {
      if (isNew) {
        storeLocation(validated)
          .then(({ data }) => {
            setLoading(false)
            setData(data.data)
            dispatch(setLocationData(data.data))
            // dispatch(addLocation(data.data)) todo
            navigate(`/locations/${data.data.slug}`)
          })
          .catch((err: AxiosError) => {
            setError(err.message)
          })
      } else {
        updateLocation(locationId, validated)
          .then(response => {
            setLoading(false)
            setData(response.data.data)
            dispatch(updateLocationData(response.data.data))
          })
          .catch((err: AxiosError) => {
            setError(err.message)
          })
      }
    }

    event.preventDefault()
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Location">
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: TLocation) => ({ ...prevState, name: value }))}
                           placeholder={'Location Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-2">
            <div className="w-full lg:w-1/4 px-2">
              <LocationInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: TLocation) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-2">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              <DiscreetTextareaField
                value={data.content}
                onChange={(value) => setData((prevState: TLocation) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the location.'}
              />
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
)
}

export default Location;