import { selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useMemo } from 'react'
import {
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'

const useNoteFields = (): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => [
    selectField({
      name: 'parent',
      label: 'Parent',
      options: notes || []
    })
  ], [notes])

  return { fields }
}

export default useNoteFields
