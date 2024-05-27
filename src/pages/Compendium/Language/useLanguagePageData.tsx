import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TLanguage } from '../../../types'
import { setLanguageData, updateLanguageData } from '../../../reducers/compendium/language/languageSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useLanguagePageData = () => {

  const { compendiumId, languageId } = useParams() as { compendiumId: string; languageId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { language: persistedData } = useAppSelector((state: RootState) => state.language) // redux]

  const isNew: boolean = useMemo(() => languageId === 'new', [languageId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    languageId,
    persistedData,
    setPersistedData: (data?: TLanguage) => dispatch(setLanguageData(data)),
    updatePersistedData: (data: Partial<TLanguage>) => dispatch(updateLanguageData(data)),
    resetPersistedData: () => dispatch(setLanguageData(undefined)),
    onCreated: (data: TLanguage) => {
      dispatch(addCompendiumChildData({ field: 'languages', data: data }))
      navigate(`${compendiumPath}/languages/${data?.slug}`)
    },
    onUpdated: (data: TLanguage) => {
      dispatch(updateCompendiumChildData({ field: 'languages', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'languages', id: languageId }))
      navigate(compendiumPath)
    },
  }

}

export default useLanguagePageData
