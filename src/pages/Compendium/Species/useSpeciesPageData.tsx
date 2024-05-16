import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TSpecies } from '../../../types'
import { setSpeciesData, updateSpeciesData } from '../../../reducers/compendium/species/speciesSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useSpeciesPageData = () => {

  const { compendiumId, speciesId } = useParams() as { compendiumId: string; speciesId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { species: persistedData } = useAppSelector((state: RootState) => state.species) // redux]

  const isNew: boolean = useMemo(() => speciesId === 'new', [speciesId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    speciesId,
    persistedData,
    setPersistedData: (data?: TSpecies) => dispatch(setSpeciesData(data)),
    updatePersistedData: (data: Partial<TSpecies>) => dispatch(updateSpeciesData(data)),
    resetPersistedData: () => dispatch(setSpeciesData(undefined)),
    onCreated: (data: TSpecies) => {
      dispatch(addCompendiumChildData({ field: 'species', data: data }))
      navigate(`${compendiumPath}/species/${persistedData?.slug}`)
    },
    onUpdated: (data: TSpecies) => {
      dispatch(updateCompendiumChildData({ field: 'species', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'species', id: speciesId }))
      navigate(compendiumPath)
    },
  }

}

export default useSpeciesPageData
