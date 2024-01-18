import React, { FunctionComponent, JSX, useEffect } from 'react'
import { storeStory, TStoryRequest, updateStory, viewStory } from '../../services/StoryService'
import { clearStoryData, setStoryData, updateStoryData } from '../../reducers/compendium/story/storySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TStory } from '../../types'
import Post from '../../components/Post/component'

const Story: FunctionComponent = (): JSX.Element => {

  const { story } = useAppSelector((state: RootState) => state.story) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, storyId } = useParams() as { compendiumId: string; storyId: string } // router

  const readyDataForRequest = (data: any): TStoryRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={storyId}
      isNew={storyId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/stories/${data.slug}`}
      ready={true}

      onCreate={(data: TStoryRequest) => storeStory(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TStoryRequest) => updateStory(storyId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'stories', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'stories', data: data }))
      }}
      onFetch={() => viewStory(storyId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={story as TStory}
      setPersistedData={(data) => dispatch(setStoryData(data))}
      updatePersistedData={(data) => dispatch(updateStoryData(data))}
      resetPersistedData={() => dispatch(clearStoryData(undefined))}
    />
  )
}

export default Story
