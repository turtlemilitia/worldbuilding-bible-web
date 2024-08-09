import { TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";

const useCompendiumFields = (): TUseFields => {

  const fields: TField[] = []

  return { fields, ready: true }
}

export default useCompendiumFields
