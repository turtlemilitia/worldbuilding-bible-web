import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TNaturalResource } from '../../../types'
import useNaturalResourcePageData from './useNaturalResourcePageData'
import { useNaturalResourceFields, useNaturalResourceForm } from '../../../hooks/useNaturalResourceForm'
import useImageSelection from '../../../hooks/useImageSelection'

const NaturalResource: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useNaturalResourcePageData();

  const form = useNaturalResourceForm(pageData);

  const fields = useNaturalResourceFields({
    compendium,
    naturalResource: pageData.persistedData,
    onNoteCreated: (note) => pageData.setPersistedData({ ...form.newData as TNaturalResource, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => pageData.setPersistedData({ ...form.newData as TNaturalResource, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'naturalResources',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'NaturalResource'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default NaturalResource
