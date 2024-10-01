import noteService, { TNoteRequest } from '../../../services/ApiService/Notebooks/NoteService'
import { noteSlice } from '@/reducers/notebook/note/noteSlice'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import { TNote, TNotebook } from '@/types'
import { notesIndexSlice } from '@/reducers/notebook/note/notesIndexSlice'
import { TDataManager, useDataManager } from '@/hooks/DataManagers'

type TNoteDataManager = TDataManager<TNote, TNoteRequest> & {
  note?: TNote,
} & hasImageableDataManager

const useNoteDataManager = (): TNoteDataManager => {

  const manager = useDataManager(
    'note',
    noteSlice,
    notesIndexSlice,
    noteService,
  )
  return {
    ...manager,
    note: manager.entity,
    images: useImageableDataManager(noteSlice, noteService.images)
  }

}

export default useNoteDataManager