import { TNote } from '../../../types'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { TNoteRequest } from '../../../services/ApiService/Notebooks/NoteService'
import useNoteDataManager from '../../DataManagers/Notebooks/useNoteDataManager'
import usePostForm from '../usePostForm'
import useNoteFields from './useNoteFields'

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

  const include = useMemo(() => '', [])

  const manager = useNoteDataManager();

  const { fields } = useNoteFields();

  const mapData = useCallback((data: any): TNoteRequest => ({
    name: data.name,
    content: data.content,
  }), [])

  return usePostForm({
    id: noteId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted
  })
}

export default useNoteForm;
