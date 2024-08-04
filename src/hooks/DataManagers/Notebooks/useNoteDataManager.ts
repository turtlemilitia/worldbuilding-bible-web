import noteService, { TNoteRequest } from '../../../services/ApiService/Notebooks/NoteService'
import { noteSlice } from '../../../reducers/notebook/note/noteSlice'
import { notebookSlice } from '../../../reducers/notebook/notebookSlice'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TNote, TNotebook } from '../../../types'

type TNoteDataManager = TChildDataManager<TNotebook, TNote, TNoteRequest> & {
  notebook?: TNotebook,
  note?: TNote,
} & hasImageableDataManager

const useNoteDataManager = (): TNoteDataManager => {

  const manager = useChildDataManager(
    'note',
    'notebook',
    noteSlice,
    notebookSlice,
    noteService,
  )
  return {
    ...manager,
    note: manager.entity,
    images: useImageableDataManager(noteSlice, noteService.images)
  }

}

export default useNoteDataManager