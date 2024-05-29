import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TReligion } from '../../../types'
import useReligionPageData from './useReligionPageData'
import { useReligionFields, useReligionForm } from '../../../hooks/useReligionForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Religion: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useReligionPageData();

  const form = useReligionForm(pageData);

  const fields = useReligionFields({
    compendium,
    religion: pageData.persistedData,
    onNoteCreated: (note) => pageData.setPersistedData({ ...form.newData as TReligion, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => pageData.setPersistedData({ ...form.newData as TReligion, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'religions',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Religion'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Religion
