import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TCompendium } from '../../../types'
import { setCompendiumData, updateCompendiumData } from '../../../reducers/compendium/compendiumSlice'
import { addCompendium } from '../../../reducers/compendium/compendiaIndexSlice'

const useCompendiumPageData = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { compendium: persistedData } = useAppSelector((state: RootState) => state.compendium) // redux]

  return {
    persistedData,
    setPersistedData: (data?: TCompendium) => dispatch(setCompendiumData(data)),
    updatePersistedData: (data: Partial<TCompendium>) => dispatch(updateCompendiumData(data)),
    resetPersistedData: () => dispatch(setCompendiumData(undefined)),
    onCreated: (data: TCompendium) => {
      dispatch(addCompendium(data))
      navigate(`/compendia/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/`)
    },
  }

}

export default useCompendiumPageData