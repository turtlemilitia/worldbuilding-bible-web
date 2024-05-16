import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TPlane } from '../../../types'
import usePlanePageData from './usePlanePageData'
import { usePlaneFields, usePlaneForm } from '../../../hooks/usePlaneForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Plane: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = usePlanePageData();

  const form = usePlaneForm(pageData);

  const fields = usePlaneFields({
    compendium,
    plane: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TPlane, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TPlane, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'planes',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Plane'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Plane
