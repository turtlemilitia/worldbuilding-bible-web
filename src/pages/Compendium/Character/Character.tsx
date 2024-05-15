import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import { useCharacterFields, useCharacterForm } from '../../../hooks/useCharacterForm'
import { TCharacter } from '../../../types'
import Post from '../../../components/Post'
import useImageSelection from '../../../hooks/useImageSelection'
import useCharacterPageData from './useCharacterPageData'

const Character: FunctionComponent = (): JSX.Element => {

  const { characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const isNew: boolean = useMemo(() => characterId === 'new', [characterId])

  const pageData = useCharacterPageData();

  const canEdit: boolean = useMemo(() => isNew || pageData.persistedData?.canUpdate !== undefined, [isNew, pageData.persistedData?.canUpdate])

  const form = useCharacterForm({
    isNew,
    ...pageData
  });

  const fields = useCharacterFields({
    compendium,
    character: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'character',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
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
