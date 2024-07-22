import { TNotebook } from '../../../types'
import { createApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'

export type TNotebookRequest = {
  name: string;
  content: string;
}

type TNotebookResponse = TNotebook;

type TNotebookIndexResponse = TNotebook[];

const NotebookService = {
  ...createApiService<TNotebookRequest, TNotebookIndexResponse, TNotebookResponse>('notebooks'),
  ...createImageableService('notebooks')
}

export default NotebookService