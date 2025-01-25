import noteService, { TNoteRequest } from '@/services/ApiService/Notes/NoteService'
import { noteSlice } from '@/reducers/note/noteSlice'
import {
  useImageableDataManager,
  hasImageableDataManager,
  useDataManager, TDataManager,
} from '@/hooks/DataManagers'
import { TNote } from '@/types'
import { notesIndexSlice } from '@/reducers/note/notesIndexSlice'

export type TNoteDataManager = TDataManager<TNote, TNoteRequest> & {
  note?: TNote,
} & hasImageableDataManager

const useNoteDataManager = (id?: number): TNoteDataManager => {

  const manager = useDataManager(
    'notes',
    id,
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