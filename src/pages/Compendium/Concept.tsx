import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import ContentWrapper from '../../components/ContentWrapper'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
import { storeConcept, TConceptRequest, updateConcept, viewConcept } from '../../services/ConceptService'
import {
  clearConceptData,
  setConceptData,
  updateConceptData
} from '../../reducers/compendium/concept/conceptSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import ConceptInfoBar from './ConceptInfoBar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import { setCompendiumData } from '../../reducers/compendium/compendiumSlice'

const Concept: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, conceptId } = useParams() as { compendiumId: string; conceptId: string } // router

  const { concept } = useAppSelector((state: RootState) => state.concept) // redux

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(true) // todo turn to false after implementing species
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = conceptId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewConcept(conceptId, ['compendium'])
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setConceptData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (conceptId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearConceptData(undefined))
    }
    return () => {
      dispatch(clearConceptData(undefined))
    }
  }, [conceptId])

  const validate = (): boolean => {
    if (!data.name || !data.content) {
      setError('Validation failed')
      return false
    }
    return true;
  }

  const readyDataForRequest = (data: any): TConceptRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!validate()) {
      return;
    }
    setLoading(true)
    const validated = readyDataForRequest(data);
    if (isNew) {
      storeConcept(compendiumId, validated)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setConceptData(data.data))
          dispatch(setCompendiumData({ 'hasConcepts': true }))
          // dispatch(addConcept(data.data)) todo
          navigate(`/compendia/${compendiumId}/concepts/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateConcept(conceptId, validated)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateConceptData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Concept">
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                           placeholder={'Concept Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-3">
            <div className="w-full lg:w-1/4 px-3">
              <ConceptInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: any) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-3">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              <DiscreetTextareaField
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the concept.'}
              />
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
)
}

export default Concept;