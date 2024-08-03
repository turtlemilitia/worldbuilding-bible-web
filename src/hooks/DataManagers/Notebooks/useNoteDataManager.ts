import { useMemo } from 'react'
import noteService, { TNoteRequest } from '../../../services/ApiService/Notebooks/NoteService'
import { noteSlice } from '../../../reducers/notebook/note/noteSlice'
import { notebookSlice } from '../../../reducers/notebook/notebookSlice'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TNote, TNotebook } from '../../../types'

type TNoteDataManager = TChildDataManager<TNotebook, TNote, TNoteRequest> & {
  notebook?: TNotebook,
  note?: TNote,
} & hasImageableDataManager

const useNoteDataManager = (): TNoteDataManager => {

  const manager = useMemo(() => createChildDataManager(
    'note',
    'notebook',
    noteSlice,
    notebookSlice,
    noteService,
  ), [])
  return {
    ...manager,
    note: manager.entity,
    images: useMemo(() => createImageableDataManager(noteSlice, noteService.images), [])
  }

}

export default useNoteDataManager