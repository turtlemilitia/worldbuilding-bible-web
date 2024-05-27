import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TSession } from '../../../types'
import useSessionPageData from './useSessionPageData'
import { useSessionFields, useSessionForm } from '../../../hooks/useSessionForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Session: FunctionComponent = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const pageData = useSessionPageData();

  const form = useSessionForm(pageData);

  const fields = useSessionFields({
    campaign,
    session: pageData.persistedData,
    onNoteCreated: (note) => pageData.setPersistedData({ ...form.newData as TSession, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => pageData.setPersistedData({ ...form.newData as TSession, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'sessions',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Session'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Session
