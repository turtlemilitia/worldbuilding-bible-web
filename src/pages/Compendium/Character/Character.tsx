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

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useCharacterPageData();

  const form = useCharacterForm(pageData);

  const fields = useCharacterFields({
    compendium,
    character: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'characters',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Character'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Character
