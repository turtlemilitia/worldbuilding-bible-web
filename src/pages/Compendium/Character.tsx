import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useCharacterForm, useCharacterFields } from '../../hooks/useCharacterForm'
import { TCharacter } from '../../types'
import Post from "../../components/Post";
import useImageSelection from "../../hooks/useImageSelection";

const Character: FunctionComponent = (): JSX.Element => {

  const { characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const isNew: boolean = useMemo(() => characterId === 'new', [characterId])

  const form = useCharacterForm({ isNew });

  const fields = useCharacterFields({
    compendium,
    character: form.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] })
  });

  const canEdit: boolean = useMemo(() => isNew || form.persistedData?.canUpdate !== undefined, [isNew, form.persistedData?.canUpdate])

  const imageHandler = useImageSelection({
    entityType: 'character',
    entityId: form.persistedData?.slug,
    persistedData: form.persistedData,
    updatePersistedData: form.updatePersistedData
  })

  return (
    <Post
      isNew={isNew}
      pageTypeName={'Character'}
      form={form}
      fields={fields}
      canEdit={canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Character
