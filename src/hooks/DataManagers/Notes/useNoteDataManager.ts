import noteService, { TNoteRequest } from '@/services/ApiService/Notes/NoteService'
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
    images: useImageableDataManager(manager, noteService.images)
  }

}

export default useNoteDataManager