import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TCompendium } from '../../../types'
import { setCompendiumData, updateCompendiumData } from '../../../reducers/compendium/compendiumSlice'
import { addCompendium } from '../../../reducers/compendium/compendiaIndexSlice'
import { removeCampaign } from '../../../reducers/campaign/campaignsIndexSlice'

const useCompendiumPageData = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { compendiumId } = useParams() as { compendiumId: string; characterId: string } // router
  const { compendium: persistedData } = useAppSelector((state: RootState) => state.compendium) // redux]

  return {
    compendiumId,
    persistedData,
    setPersistedData: (data?: TCompendium) => dispatch(setCompendiumData(data)),
    updatePersistedData: (data: Partial<TCompendium>) => dispatch(updateCompendiumData(data)),
    resetPersistedData: () => dispatch(setCompendiumData(undefined)),
    onCreated: (data: TCompendium) => {
      dispatch(addCompendium(data))
      navigate(`/compendia/${data.slug}`)
    },
    onDeleted: () => {
      dispatch(removeCampaign({id: compendiumId}))
      navigate(`/`)
    },
  }

}

export default useCompendiumPageData
