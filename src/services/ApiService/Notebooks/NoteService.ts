import { TNote } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'

export interface TNoteRequest {
  name: string;
  content: string;
}

type TNoteResponse = TNote;
  
type TNoteIndexResponse = TNote[];

const NoteService = {
  ...createChildApiService<TNoteRequest, TNoteIndexResponse, TNoteResponse> ('notebooks', 'notes'),
  ...createImageableService('notes')
}

export default NoteService