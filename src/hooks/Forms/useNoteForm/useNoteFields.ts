import { selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useMemo } from 'react'
import { TNoteDataManager, useNoteIndexDataManager } from '@/hooks/DataManagers'
import { PenIcon } from 'lucide-react'

const useNoteFields = (manager: TNoteDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => [
    selectField({
      name: 'parent',
      label: 'Parent',
      options: notes || []
    }),
    {
      type: 'editor',
      name: 'children',
      dialogType: 'note',
      link: (id) => `/notes/${id}`,
      label: 'Children',
      Icon: PenIcon
    }
  ], [notes])

  return { fields }
}

export default useNoteFields
