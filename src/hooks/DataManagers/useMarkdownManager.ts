import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback, useMemo } from 'react'
import { TApi, TQueryParams } from '@/services/ApiService/types'
import { Slice } from '@reduxjs/toolkit'
import { TIndexSliceState } from '@/reducers/createIndexSlice'
import {
  Identifiable,
  TGenericPost,
  TImage,
  TTypesAllowedString,
} from '@/types'
import { mapPlural, mapSingular } from '@/utils/dataUtils'
import { TMarkdownApi } from '@/services/ApiService/createMarkdownService'

export type TMarkdownManager = {
  exportMarkdown (id: Identifiable['id']): void
}

export const useMarkdownManager = <TEntity extends TGenericPost> (
  api: TMarkdownApi['markdown'],
): TMarkdownManager => {

  const exportMarkdown = useCallback(async (id: number): Promise<any> => {
    await api.export(id)
  }, [api])

  return {
    exportMarkdown
  }
}

export type hasMarkdownManager = {
  markdown: TMarkdownManager
}

export default useMarkdownManager;

