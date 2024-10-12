import { TNote } from '@/types'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { TNoteRequest } from '@/services/ApiService/Notebooks/NoteService'
import useNoteDataManager from '../../DataManagers/Notebooks/useNoteDataManager'
import usePostForm from '../usePostForm'
import useNoteFields from './useNoteFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  noteId: TNote['slug'];
}
const useNoteForm = ({
  noteId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNote>): TForm<TNote> => {

  const include = useMemo(() => 'notebook', [])

  const manager = useNoteDataManager();

  const { fields } = useNoteFields();

  const mapData = useCallback((data: TNote): TNoteRequest => ({
    name: data.name,
    content: data.content,
    notebookId: data.notebook?.id || null
  }), [])

  return {...usePostForm({
    id: noteId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('notes', noteId)
  }), pinHandler: undefined, permissionHandler: undefined}
}

export default useNoteForm;
