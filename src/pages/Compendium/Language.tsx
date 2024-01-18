import React, { FunctionComponent, JSX } from 'react'
import { storeLanguage, TLanguageRequest, updateLanguage, viewLanguage } from '../../services/LanguageService'
import {
  clearLanguageData,
  setLanguageData,
  updateLanguageData
} from '../../reducers/compendium/language/languageSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TLanguage } from '../../types'

const Language: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, languageId } = useParams() as { compendiumId: string; languageId: string } // router

  const { language } = useAppSelector((state: RootState) => state.language) // redux

  const navigate = useNavigate()

  const isNew: boolean = languageId === 'new'

  const readyDataForRequest = (data: any): TLanguageRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TLanguage> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeLanguage(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'languages', data: data.data }))
          navigate(`/compendia/${compendiumId}/languages/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateLanguage(languageId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'languages', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={languageId}
      isNew={isNew}
      remoteData={language as TLanguage}
      onSave={submit}
      onFetch={() => viewLanguage(languageId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      ready={true}
      setRemoteData={(data) => dispatch(setLanguageData(data))}
      resetData={() => dispatch(clearLanguageData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Language
