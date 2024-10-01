import { TNote } from '@/types'
import { createApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'

export interface TNoteRequest {
  name: string;
  content: string;
  notebookId: number|null;
}

type TNoteResponse = TNote;
  
type TNoteIndexResponse = TNote[];

const NoteService = {
  ...createApiService<TNoteRequest, TNoteIndexResponse, TNoteResponse> ('notes'),
  ...createImageableService('notes')
}

export default NoteService