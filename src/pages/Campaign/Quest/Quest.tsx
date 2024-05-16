import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TQuest } from '../../../types'
import useQuestPageData from './useQuestPageData'
import { useQuestFields, useQuestForm } from '../../../hooks/useQuestForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Quest: FunctionComponent = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const pageData = useQuestPageData();

  const form = useQuestForm(pageData);

  const fields = useQuestFields({
    campaign,
    quest: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TQuest, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TQuest, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'quest',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Quest'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Quest
