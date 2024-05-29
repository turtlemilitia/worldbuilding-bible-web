import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TSpecies } from '../../../types'
import useSpeciesPageData from './useSpeciesPageData'
import { useSpeciesFields, useSpeciesForm } from '../../../hooks/useSpeciesForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Species: FunctionComponent = (): JSX.Element => {

  const { speciesId } = useParams() as { compendiumId: string; speciesId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useSpeciesPageData();

  const form = useSpeciesForm(pageData);

  const fields = useSpeciesFields({
    compendium,
    species: pageData.persistedData,
    onNoteCreated: (note) => pageData.setPersistedData({ ...form.newData as TSpecies, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => pageData.setPersistedData({ ...form.newData as TSpecies, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'species',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Species'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Species
