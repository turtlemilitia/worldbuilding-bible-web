import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TSpell } from '../../../types'
import useSpellPageData from './useSpellPageData'
import { useSpellFields, useSpellForm } from '../../../hooks/useSpellForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Spell: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useSpellPageData();

  const form = useSpellForm(pageData);

  const fields = useSpellFields({
    compendium,
    spell: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TSpell, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TSpell, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'spells',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Spell'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Spell
