import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TCharacter } from '../../../types'
import { setCharacterData, updateCharacterData } from '../../../reducers/compendium/character/characterSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'

const useCharacterPageData = () => {

  const { characterId } = useParams() as { compendiumId: string; characterId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { character: persistedData } = useAppSelector((state: RootState) => state.character) // redux]

  return {
    persistedData,
    setPersistedData: (data?: TCharacter) => dispatch(setCharacterData(data)),
    updatePersistedData: (data: Partial<TCharacter>) => dispatch(updateCharacterData(data)),
    resetPersistedData: () => dispatch(setCharacterData(undefined)),
    onCreated: (data: TCharacter) => {
      dispatch(addCompendiumChildData({ field: 'characters', data: data }))
      navigate(`${compendiumPath}/characters/${persistedData?.slug}`)
    },
    onUpdated: (data: TCharacter) => {
      dispatch(updateCompendiumChildData({ field: 'characters', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'characters', id: characterId }))
      navigate(compendiumPath)
    },
  }

}

export default useCharacterPageData