import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TStory } from '../../../types'
import useStoryPageData from './useStoryPageData'
import { useStoryFields, useStoryForm } from '../../../hooks/useStoryForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Story: FunctionComponent = (): JSX.Element => {

  const { storyId } = useParams() as { compendiumId: string; storyId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useStoryPageData();

  const form = useStoryForm(pageData);

  const fields = useStoryFields({
    compendium,
    story: pageData.persistedData,
    onNoteCreated: (note) => pageData.setPersistedData({ ...form.newData as TStory, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => pageData.setPersistedData({ ...form.newData as TStory, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'stories',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Story'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Story
