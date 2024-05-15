import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TConcept } from '../../../types'
import { setConceptData, updateConceptData } from '../../../reducers/compendium/concept/conceptSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'

const useConceptPageData = () => {

  const { compendiumId, conceptId } = useParams() as { compendiumId: string; conceptId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { concept: persistedData } = useAppSelector((state: RootState) => state.concept) // redux]

  return {
    compendiumId,
    conceptId,
    persistedData,
    setPersistedData: (data?: TConcept) => dispatch(setConceptData(data)),
    updatePersistedData: (data: Partial<TConcept>) => dispatch(updateConceptData(data)),
    resetPersistedData: () => dispatch(setConceptData(undefined)),
    onCreated: (data: TConcept) => {
      dispatch(addCompendiumChildData({ field: 'concepts', data: data }))
      navigate(`${compendiumPath}/concepts/${persistedData?.slug}`)
    },
    onUpdated: (data: TConcept) => {
      dispatch(updateCompendiumChildData({ field: 'concepts', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'concepts', id: conceptId }))
      navigate(compendiumPath)
    },
  }

}

export default useConceptPageData
