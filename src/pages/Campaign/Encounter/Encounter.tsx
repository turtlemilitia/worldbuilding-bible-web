import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TEncounter } from '../../../types'
import useEncounterPageData from './useEncounterPageData'
import { useEncounterFields, useEncounterForm } from '../../../hooks/useEncounterForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Encounter: FunctionComponent = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const pageData = useEncounterPageData();

  const form = useEncounterForm(pageData);

  const fields = useEncounterFields({
    campaign,
    encounter: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TEncounter, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TEncounter, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'encounters',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Encounter'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Encounter
