import React, { FunctionComponent, JSX } from 'react'
import { destroyStory, storeStory, TStoryRequest, updateStory, viewStory } from '../../services/StoryService'
import { clearStoryData, setStoryData, updateStoryData } from '../../reducers/compendium/story/storySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TStory } from '../../types'
import Post from '../../components/Post'

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
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewStory(storyId).then(({ data }) => data.data)}
      onCreate={(data: TStoryRequest) => storeStory(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TStoryRequest) => updateStory(storyId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyStory(storyId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'stories', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'stories', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'stories', id: storyId }))
      }}

      fields={[]}

      persistedData={story as TStory}
      setPersistedData={(data) => dispatch(setStoryData(data))}
      updatePersistedData={(data) => dispatch(updateStoryData(data))}
      resetPersistedData={() => dispatch(clearStoryData(undefined))}
    />
  )
}

export default Story
