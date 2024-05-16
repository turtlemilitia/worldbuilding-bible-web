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
import { useMemo } from 'react'

const useCharacterPageData = () => {

  const { compendiumId, characterId } = useParams() as { compendiumId: string; characterId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { character: persistedData } = useAppSelector((state: RootState) => state.character) // redux]

  const isNew: boolean = useMemo(() => characterId === 'new', [characterId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    characterId,
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
