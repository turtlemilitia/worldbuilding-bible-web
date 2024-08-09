import { TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";

const useNotebookFields = (): TUseFields => {

  const fields: TField[] = []

  return { fields, ready: true }
}

export default useNotebookFields
