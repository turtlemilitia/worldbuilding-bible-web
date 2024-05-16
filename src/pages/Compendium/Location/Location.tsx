import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TLocation } from '../../../types'
import useLocationPageData from './useLocationPageData'
import { useLocationFields, useLocationForm } from '../../../hooks/useLocationForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Location: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useLocationPageData();

  const form = useLocationForm(pageData);

  const fields = useLocationFields({
    compendium,
    location: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TLocation, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TLocation, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'locations',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Location'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Location
