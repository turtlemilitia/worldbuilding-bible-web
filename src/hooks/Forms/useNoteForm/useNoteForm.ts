import { TNote } from '@/types'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { TNoteRequest } from '@/services/ApiService/Notes/NoteService'
import useNoteDataManager from '@/hooks/DataManagers/Notes/useNoteDataManager'
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

  const include = useMemo(() => 'parent:id,slug,name;children:id,slug,name,parent_id', [])

  const manager = useNoteDataManager();

  const { fields } = useNoteFields();

  const mapData = useCallback((data: TNote): TNoteRequest => ({
    name: data.name,
    content: data.content,
    parentId: data.parent?.id || null
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
