import React, { FunctionComponent, JSX } from 'react'
import {
  destroyLanguage,
  storeLanguage,
  TLanguageRequest,
  updateLanguage,
  viewLanguage
} from '../../services/LanguageService'
import {
  clearLanguageData,
  setLanguageData,
  updateLanguageData
} from '../../reducers/compendium/language/languageSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TLanguage } from '../../types'
import useUrlFormatter from '../../utils/hooks/useUrlFormatter'

const Language: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, languageId } = useParams() as { compendiumId: string; languageId: string } // router

  const { language } = useAppSelector((state: RootState) => state.language) // redux

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TLanguageRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={languageId}
      isNew={languageId === 'new'}
      pageTypeName={'Language'}
      pathToNew={(data) => `${compendiumPath}/languages/${data.slug}`}
      pathAfterDelete={compendiumPath}
      canEdit={language.canUpdate}
      canDelete={language.canDelete}
      ready={true}

      onFetch={() => viewLanguage(languageId).then(({ data }) => data.data)}
      onCreate={(data: TLanguageRequest) => storeLanguage(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TLanguageRequest) => updateLanguage(languageId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyLanguage(languageId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'languages', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'languages', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'languages', id: languageId }))
      }}

      fields={[]}

      persistedData={language as TLanguage}
      setPersistedData={(data) => dispatch(setLanguageData(data))}
      updatePersistedData={(data) => dispatch(updateLanguageData(data))}
      resetPersistedData={() => dispatch(clearLanguageData(undefined))}
    />
  )
}

export default Language
