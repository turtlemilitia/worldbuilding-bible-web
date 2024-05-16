import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import Post from '../../../components/Post'
import { TCurrency } from '../../../types'
import useCurrencyPageData from './useCurrencyPageData'
import { useCurrencyFields, useCurrencyForm } from '../../../hooks/useCurrencyForm'
import useImageSelection from '../../../hooks/useImageSelection'

const Currency: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const pageData = useCurrencyPageData();

  const form = useCurrencyForm(pageData);

  const fields = useCurrencyFields({
    compendium,
    currency: pageData.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TCurrency, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TCurrency, notes: [...(form.newData?.notes ?? []), note] })
  });

  const imageHandler = useImageSelection({
    entityType: 'currencies',
    entityId: pageData.persistedData?.slug,
    persistedData: pageData.persistedData,
    updatePersistedData: pageData.updatePersistedData
  })

  return (
    <Post
      isNew={pageData.isNew}
      pageTypeName={'Currency'}
      form={form}
      fields={fields}
      canEdit={pageData.canEdit}
      imageHandler={imageHandler}
    />
  )
}

export default Currency
