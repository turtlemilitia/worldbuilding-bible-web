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
import Post from '../../components/Post'
import { TLanguage } from '../../types'

const Language: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, languageId } = useParams() as { compendiumId: string; languageId: string } // router

  const { language } = useAppSelector((state: RootState) => state.language) // redux

  const readyDataForRequest = (data: any): TLanguageRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={languageId}
      isNew={languageId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/languages/${data.slug}`}
      ready={true}

      onCreate={(data: TLanguageRequest) => storeLanguage(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TLanguageRequest) => updateLanguage(languageId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'languages', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'languages', data: data }))
      }}
      onFetch={() => viewLanguage(languageId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={language as TLanguage}
      setPersistedData={(data) => dispatch(setLanguageData(data))}
      updatePersistedData={(data) => dispatch(updateLanguageData(data))}
      resetPersistedData={() => dispatch(clearLanguageData(undefined))}
    />
  )
}

export default Language
