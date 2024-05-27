import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TLocation } from '../../../types'
import { setLocationData, updateLocationData } from '../../../reducers/compendium/location/locationSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useLocationPageData = () => {

  const { compendiumId, locationId } = useParams() as { compendiumId: string; locationId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { location: persistedData } = useAppSelector((state: RootState) => state.location) // redux

  const isNew: boolean = useMemo(() => locationId === 'new', [locationId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    locationId,
    persistedData,
    setPersistedData: (data?: TLocation) => dispatch(setLocationData(data)),
    updatePersistedData: (data: Partial<TLocation>) => dispatch(updateLocationData(data)),
    resetPersistedData: () => dispatch(setLocationData(undefined)),
    onCreated: (data: TLocation) => {
      dispatch(addCompendiumChildData({ field: 'locations', data: data }))
      navigate(`${compendiumPath}/locations/${data?.slug}`)
    },
    onUpdated: (data: TLocation) => {
      dispatch(updateCompendiumChildData({ field: 'locations', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'locations', id: locationId }))
      navigate(compendiumPath)
    },
  }

}

export default useLocationPageData
