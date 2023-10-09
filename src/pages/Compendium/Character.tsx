import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import ContentWrapper from '../../components/ContentWrapper'
import MarkdownEditor from '../../components/Forms/Fields/MarkdownEditor'
import { storeCharacter, TCharacterRequest, updateCharacter, viewCharacter } from '../../services/CharacterService'
import {
  clearCharacterData,
  setCharacterData,
  updateCharacterData
} from '../../reducers/compendium/character/characterSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import CharacterInfoBar from './CharacterInfoBar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import { setCompendiumData } from '../../reducers/compendium/compendiumSlice'

const Character: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const { character } = useAppSelector((state: RootState) => state.character) // redux

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(true) // todo turn to false after implementing species
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = characterId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewCharacter(characterId, ['compendium'])
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setCharacterData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (characterId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearCharacterData(undefined))
    }
    return () => {
      dispatch(clearCharacterData(undefined))
    }
  }, [characterId])

  const validate = (): boolean => {
    if (!data.name || !data.content) {
      setError('Validation failed')
      return false
    }
    return true;
  }

  const readyDataForRequest = (data: any): TCharacterRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
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
      storeCharacter(compendiumId, validated)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setCharacterData(data.data))
          dispatch(setCompendiumData({ 'hasCharacters': true }))
          // dispatch(addCharacter(data.data)) todo
          navigate(`/compendia/${compendiumId}/characters/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateCharacter(characterId, validated)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateCharacterData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Character">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                          placeholder={'Character Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-3">
            <div className="w-full lg:w-1/4 px-3">
              <CharacterInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: any) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-3">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <MarkdownEditor
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the character.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
)
}

export default Character;