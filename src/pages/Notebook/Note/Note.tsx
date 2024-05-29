import React, { FunctionComponent, JSX } from 'react'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import useNotePageData from './useNotePageData'
import { useNoteFields, useNoteForm } from '../../../hooks/useNoteForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Note: FunctionComponent = (): JSX.Element => {

  const { notebook } = useAppSelector((state: RootState) => state.notebook) // redux

  const pageData = useNotePageData();

  const form = useNoteForm(pageData);

  const fields = useNoteFields({
    notebook,
    note: pageData.persistedData,
  });

  const imageHandler = useImageSelection({
    entityType: 'note',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Note'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Note
