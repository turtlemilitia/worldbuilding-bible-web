import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TConcept } from '../../../types'
import useConceptPageData from './useConceptPageData'
import { useConceptFields, useConceptForm } from '../../../hooks/useConceptForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Concept: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useConceptPageData();

  const form = useConceptForm(pageData);

  const fields = useConceptFields({
    compendium,
    concept: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TConcept, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TConcept, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'concepts',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Concept'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Concept
