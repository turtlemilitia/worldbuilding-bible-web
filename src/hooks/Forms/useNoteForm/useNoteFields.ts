import { selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useMemo } from 'react'
import {
  useNotebookIndexDataManager,
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'

const useNoteFields = (): TUseFields => {

  const { notes } = useNoteIndexDataManager()
  const { notebooks } = useNotebookIndexDataManager()

  const fields: TField[] = useMemo(() => [
    selectField({
      name: 'parent',
      label: 'Parent',
      options: notes || []
    }),
    selectField({
      name: 'notebook',
      label: 'Notebook',
      options: notebooks || []
    })
  ], [notes, notebooks])

  return { fields }
}

export default useNoteFields
