import React, { FunctionComponent, JSX } from 'react'
import Post from '../../components/Post'
import useSystemPageData from './useSystemPageData'
import { useSystemFields, useSystemForm } from '../../hooks/useSystemForm'
import useImageSelection from '../../hooks/useImageSelection'

const System: FunctionComponent = (): JSX.Element => {

  const pageData = useSystemPageData();

  const form = useSystemForm(pageData);

  const fields = useSystemFields({
    system: pageData.persistedData,
  });

  const imageHandler = useImageSelection({
    entityType: 'system',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'System'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default System
