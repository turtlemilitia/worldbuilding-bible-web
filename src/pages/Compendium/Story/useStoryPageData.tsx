import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TStory } from '../../../types'
import { setStoryData, updateStoryData } from '../../../reducers/compendium/story/storySlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useStoryPageData = () => {

  const { compendiumId, storyId } = useParams() as { compendiumId: string; storyId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { story: persistedData } = useAppSelector((state: RootState) => state.story) // redux]

  const isNew: boolean = useMemo(() => storyId === 'new', [storyId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    storyId,
    persistedData,
    setPersistedData: (data?: TStory) => dispatch(setStoryData(data)),
    updatePersistedData: (data: Partial<TStory>) => dispatch(updateStoryData(data)),
    resetPersistedData: () => dispatch(setStoryData(undefined)),
    onCreated: (data: TStory) => {
      dispatch(addCompendiumChildData({ field: 'stories', data: data }))
      navigate(`${compendiumPath}/stories/${data?.slug}`)
    },
    onUpdated: (data: TStory) => {
      dispatch(updateCompendiumChildData({ field: 'stories', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'stories', id: storyId }))
      navigate(compendiumPath)
    },
  }

}

export default useStoryPageData
