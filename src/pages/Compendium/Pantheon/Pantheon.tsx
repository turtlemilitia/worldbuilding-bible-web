import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TPantheon } from '../../../types'
import usePantheonPageData from './usePantheonPageData'
import { usePantheonFields, usePantheonForm } from '../../../hooks/usePantheonForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Pantheon: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = usePantheonPageData();

  const form = usePantheonForm(pageData);

  const fields = usePantheonFields({
    compendium,
    pantheon: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TPantheon, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TPantheon, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'pantheons',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Pantheon'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Pantheon
