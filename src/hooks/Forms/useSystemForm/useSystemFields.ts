import { TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { TSystemDataManager } from '@/hooks/DataManagers'

const useSystemFields = (manager: TSystemDataManager): TUseFields => {

  const fields: TField[] = []

  return { fields }
}

export default useSystemFields
