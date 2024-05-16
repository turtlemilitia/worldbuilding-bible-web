import useFields, { TField } from '../useFields'
import { TNote, TNotebook } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  notebook?: TNotebook,
  note?: TNote
}

const useNoteFields = ({ notebook, note }: TProps): TUseFields => {

  const fields: TField[] = []

  return { fields, ready: true }
}

export default useNoteFields
