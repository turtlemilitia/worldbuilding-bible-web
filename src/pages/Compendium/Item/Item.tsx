import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TItem } from '../../../types'
import useItemPageData from './useItemPageData'
import { useItemFields, useItemForm } from '../../../hooks/useItemForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Item: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useItemPageData();

  const form = useItemForm(pageData);

  const fields = useItemFields({
    compendium,
    item: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TItem, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TItem, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'items',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Item'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Item
