import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TFaction } from '../../../types'
import useFactionPageData from './useFactionPageData'
import { useFactionFields, useFactionForm } from '../../../hooks/useFactionForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Faction: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useFactionPageData();

  const form = useFactionForm(pageData);

  const fields = useFactionFields({
    compendium,
    faction: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TFaction, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TFaction, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'factions',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Faction'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Faction
