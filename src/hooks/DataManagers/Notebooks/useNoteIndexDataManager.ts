import { TNote } from '@/types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import NoteService from '@/services/ApiService/Notebooks/NoteService'
import { notesIndexSlice } from '@/reducers/notebook/note/notesIndexSlice'

type TNoteIndexDataManager = TIndexDataManager<TNote> & {
  notes?: TNote[]
}

const useNoteIndexDataManager = (): TNoteIndexDataManager => {
  const manager = useIndexDataManager(
    'notes',
    notesIndexSlice,
    NoteService,
  )
  return {
    ...manager,
    notes: manager.list,
  }
}

export default useNoteIndexDataManager