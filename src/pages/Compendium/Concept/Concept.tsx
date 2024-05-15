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

  const { conceptId } = useParams() as { compendiumId: string; conceptId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const isNew: boolean = useMemo(() => conceptId === 'new', [conceptId])

  const pageData = useConceptPageData();

  const canEdit: boolean = useMemo(() => isNew || pageData.persistedData?.canUpdate !== undefined, [isNew, pageData.persistedData?.canUpdate])

  const form = useConceptForm({
    isNew,
    ...pageData
  });

  const fields = useConceptFields({
    compendium,
    concept: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TConcept, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TConcept, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'concept',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={isNew}
      pageTypeName={'Concept'}
      form={form}
      fields={fields}
      canEdit={canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Concept
