import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../components/Post'
import useCampaignPageData from './useCampaignPageData'
import { useCampaignFields, useCampaignForm } from '../../hooks/useCampaignForm'
import useImageSelection from '../../hooks/useImageSelection'

const Campaign: FunctionComponent = (): JSX.Element => {

  const pageData = useCampaignPageData();

  const form = useCampaignForm(pageData);

  const fields = useCampaignFields({
    campaign: pageData.persistedData,
  });

  const imageHandler = useImageSelection({
    entityType: 'campaign',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Campaign'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Campaign
