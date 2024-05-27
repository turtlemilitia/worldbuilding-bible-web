import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TFaction } from '../../../types'
import { setFactionData, updateFactionData } from '../../../reducers/compendium/faction/factionSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useFactionPageData = () => {

  const { compendiumId, factionId } = useParams() as { compendiumId: string; factionId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { faction: persistedData } = useAppSelector((state: RootState) => state.faction) // redux]

  const isNew: boolean = useMemo(() => factionId === 'new', [factionId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    factionId,
    persistedData,
    setPersistedData: (data?: TFaction) => dispatch(setFactionData(data)),
    updatePersistedData: (data: Partial<TFaction>) => dispatch(updateFactionData(data)),
    resetPersistedData: () => dispatch(setFactionData(undefined)),
    onCreated: (data: TFaction) => {
      dispatch(addCompendiumChildData({ field: 'factions', data: data }))
      navigate(`${compendiumPath}/factions/${data?.slug}`)
    },
    onUpdated: (data: TFaction) => {
      dispatch(updateCompendiumChildData({ field: 'factions', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'factions', id: factionId }))
      navigate(compendiumPath)
    },
  }

}

export default useFactionPageData
