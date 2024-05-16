import useFields, { TField } from '../useFields'
import { TNotebook, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  notebook?: TNotebook
}

const useNotebookFields = ({ notebook }: TProps): TUseFields => {

  const fields: TField[] = []

  return { fields, ready: true }
}

export default useNotebookFields
