import React, { FunctionComponent, JSX } from 'react'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TDeity } from '../../../types'
import useDeityPageData from './useDeityPageData'
import { useDeityFields, useDeityForm } from '../../../hooks/useDeityForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Deity: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useDeityPageData();

  const form = useDeityForm(pageData);

  const fields = useDeityFields({
    compendium,
    deity: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TDeity, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TDeity, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'deities',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Deity'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Deity
