import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TSystem } from '../../types'
import { useMemo } from 'react'
import { addSystem, removeSystem } from '../../reducers/system/systemsIndexSlice'
import { setSystemData, updateSystemData } from '../../reducers/system/systemSlice'

const useSystemPageData = () => {

  const { systemId } = useParams() as { systemId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { system: persistedData } = useAppSelector((state: RootState) => state.system) // redux]

  const isNew: boolean = useMemo(() => systemId === 'new', [systemId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    systemId,
    persistedData,
    setPersistedData: (data?: TSystem) => dispatch(setSystemData(data)),
    updatePersistedData: (data: Partial<TSystem>) => dispatch(updateSystemData(data)),
    resetPersistedData: () => dispatch(setSystemData(undefined)),
    onCreated: (data: TSystem) => {
      dispatch(addSystem(data))
      navigate(`/systems/${data.slug}`)
    },
    onUpdated: (data: TSystem) => {
      // todo update list of systems
    },
    onDeleted: () => {
      dispatch(removeSystem({ id: systemId }))
      navigate(`/`)
    },
  }

}

export default useSystemPageData
