import React, {FunctionComponent, JSX, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import Post from '../../../components/Post'
import {useCompendiumForm} from "../../../hooks/useCompendiumForm";
import useImageSelection from "../../../hooks/useImageSelection";
import useCompendiumPageData from './useCompendiumPageData'

const Compendium: FunctionComponent = (): JSX.Element => {

  const {compendiumId} = useParams() as { compendiumId: string } // router

  const isNew: boolean = useMemo(() => compendiumId === 'new', [compendiumId])

  const pageData = useCompendiumPageData();

  const form = useCompendiumForm({
    isNew,
    ...pageData
  });

  const canEdit: boolean = useMemo(() => isNew || pageData.persistedData?.canUpdate !== undefined, [isNew, pageData.persistedData?.canUpdate])

  const imageHandler = useImageSelection({
    entityType: 'compendia',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={isNew}
      pageTypeName={'Compendium'}
      form={form}
      canEdit={canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Compendium
