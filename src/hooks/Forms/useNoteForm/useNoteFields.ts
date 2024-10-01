import { selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useMemo } from 'react'
import { useNotebookIndexDataManager } from '@/hooks/DataManagers'

const useNoteFields = (): TUseFields => {

  const { notebooks } = useNotebookIndexDataManager()

  const fields: TField[] = useMemo(() => [
    selectField({
      name: 'notebook',
      label: 'Notebook',
      options: notebooks || []
    })
  ], [])

  return { fields }
}

export default useNoteFields
