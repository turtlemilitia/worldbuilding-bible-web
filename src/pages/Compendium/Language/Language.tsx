import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TLanguage } from '../../../types'
import useLanguagePageData from './useLanguagePageData'
import { useLanguageFields, useLanguageForm } from '../../../hooks/useLanguageForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Language: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useLanguagePageData();

  const form = useLanguageForm(pageData);

  const fields = useLanguageFields({
    compendium,
    language: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TLanguage, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TLanguage, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'languages',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Language'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Language
