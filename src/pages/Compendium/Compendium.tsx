import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import { TCompendium } from '../../types'
import ContentWrapper from '../../components/ContentWrapper'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
import { storeCompendium, updateCompendium, viewCompendium } from '../../services/CompendiumService'
import { clearCompendiumData, setCompendiumData, updateCompendiumData } from '../../reducers/compendium/compendiumSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import { addCompendium } from '../../reducers/compendium/compendiaIndexSlice'
import ErrorBanner from '../../components/Banners/ErrorBanner'

const Compendium: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const navigate = useNavigate()

  const initialState: TCompendium = {
    name: '',
    content: ''
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [data, setData] = useState<TCompendium>(initialState)

  const fetch = (): void => {
    setLoading(true)
    viewCompendium(compendiumId)
      .then(response => {
        setLoading(false)
        dispatch(setCompendiumData(response.data.data))
      })
  }

  useEffect(() => {

    setData(compendium);

  }, [compendium.id])

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true)
    if (!compendium.slug) {
      storeCompendium(data)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setCompendiumData(data.data))
          dispatch(addCompendium(data.data))
          navigate(`/compendia/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateCompendium(compendium.slug, data)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateCompendiumData(response.data.data))
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
        <HeaderWrapper page="Compendium">
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: TCompendium) => ({ ...prevState, name: value }))}
                           placeholder={'Compendium Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex justify-center -mx-2">
            <div className="w-full md:w-2/4 px-2">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={() => fetch && fetch()}/>
              {!loading && <DiscreetTextareaField
                value={data.content}
                onChange={(value) => setData((prevState: TCompendium) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the compendium.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default Compendium