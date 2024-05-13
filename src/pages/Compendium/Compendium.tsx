import React, {FunctionComponent, JSX, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import Post from '../../components/Post'
import {useCompendiumForm} from "../../hooks/useCompendiumForm";
import useImageSelection from "../../hooks/useImageSelection";

const Compendium: FunctionComponent = (): JSX.Element => {

  const {compendiumId} = useParams() as { compendiumId: string } // router

  const isNew: boolean = useMemo(() => compendiumId === 'new', [compendiumId])

  const form = useCompendiumForm({isNew});

  const canEdit: boolean = useMemo(() => isNew || form.persistedData?.canUpdate !== undefined, [isNew, form.persistedData?.canUpdate])

  const imageHandler = useImageSelection({
    entityType: 'compendia',
    entityId: form.persistedData?.slug,
    persistedData: form.persistedData,
    updatePersistedData: form.updatePersistedData
  })

  return (
    <Post
      isNew={isNew}
      pageTypeName={'Character'}
      form={form}
      canEdit={canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Compendium
