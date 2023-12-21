import React, { FunctionComponent, JSX, useEffect } from 'react'
import { storeStory, TStoryRequest, updateStory, viewStory } from '../../services/StoryService'
import { clearStoryData, setStoryData, updateStoryData } from '../../reducers/compendium/story/storySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TStory } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'

const Story: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { story } = useAppSelector((state: RootState) => state.story) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, storyId } = useParams() as { compendiumId: string; storyId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = storyId === 'new'

  const reset = () => dispatch(clearStoryData(undefined));

  const fetch = async () => {
    if (storyId && !isNew) {
      await viewStory(storyId, { include: 'compendium' })
        .then(response => {
          dispatch(setStoryData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {
    if (storyId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearStoryData(undefined))
    }
    return () => {
      dispatch(clearStoryData(undefined))
    }
  }, [storyId])

  const readyDataForRequest = (data: any): TStoryRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TStory> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeStory(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setStoryData(data.data))
          dispatch(addCompendiumChildData({ field: 'stories', data: data.data }))
          navigate(`/compendia/${compendiumId}/stories/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateStory(storyId, validated)
        .then(({ data }) => {
          dispatch(updateStoryData(data.data))
          dispatch(updateCompendiumChildData({ field: 'stories', data: data.data }))
          return data.data
        })
    }
  }

  const fields: TFields[] = []

  return (
    <Post
      key={storyId}
      ready={true}
      initialValues={story as TStory}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Story
