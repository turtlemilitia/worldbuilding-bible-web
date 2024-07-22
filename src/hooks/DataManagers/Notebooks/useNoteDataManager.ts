import { useMemo } from 'react'
import noteService from '../../../services/ApiService/Notebooks/NoteService'
import { noteSlice } from '../../../reducers/notebook/note/noteSlice'
import { notebookSlice } from '../../../reducers/notebook/notebookSlice'
import { createImageableDataManager } from '../createImageableDataManager'
import { createChildDataManager } from '../createChildDataManager'

const useNoteDataManager = () => {

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