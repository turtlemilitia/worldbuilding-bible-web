import React, { FunctionComponent, JSX } from 'react'
import useNotebookPageData from './useNotebookPageData'
import { useNotebookFields, useNotebookForm } from '../../hooks/useNotebookForm'
import useImageSelection from '../../hooks/useImageSelection'
import Post from '../../components/Post'

const Notebook: FunctionComponent = (): JSX.Element => {

  const pageData = useNotebookPageData();

  const form = useNotebookForm(pageData);

  const fields = useNotebookFields({
    notebook: pageData.persistedData,
  });

  const imageHandler = useImageSelection({
    entityType: 'notebook',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Notebook'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Notebook
