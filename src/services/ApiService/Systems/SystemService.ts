import { TSystem } from '../../../types'
import { createApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'

export type TSystemRequest  = {
  name: string;
  content: string;
}
type TSystemResponse = TSystem;

type TSystemIndexResponse = TSystem[];

const SystemService = {
  ...createApiService<TSystemRequest, TSystemIndexResponse, TSystemResponse>('systems'),
  ...createImageableService('systems')
}

export default SystemService