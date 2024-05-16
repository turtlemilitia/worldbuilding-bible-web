import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TSpell } from '../../../types'
import { setSpellData, updateSpellData } from '../../../reducers/compendium/spell/spellSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useSpellPageData = () => {

  const { compendiumId, spellId } = useParams() as { compendiumId: string; spellId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { spell: persistedData } = useAppSelector((state: RootState) => state.spell) // redux]

  const isNew: boolean = useMemo(() => spellId === 'new', [spellId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    spellId,
    persistedData,
    setPersistedData: (data?: TSpell) => dispatch(setSpellData(data)),
    updatePersistedData: (data: Partial<TSpell>) => dispatch(updateSpellData(data)),
    resetPersistedData: () => dispatch(setSpellData(undefined)),
    onCreated: (data: TSpell) => {
      dispatch(addCompendiumChildData({ field: 'spells', data: data }))
      navigate(`${compendiumPath}/spells/${persistedData?.slug}`)
    },
    onUpdated: (data: TSpell) => {
      dispatch(updateCompendiumChildData({ field: 'spells', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'spells', id: spellId }))
      navigate(compendiumPath)
    },
  }

}

export default useSpellPageData
