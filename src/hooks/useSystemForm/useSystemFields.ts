import useFields, { TField } from '../useFields'
import { TSystem, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  system?: TSystem,
}

const useSystemFields = ({ system }: TProps): TUseFields => {

  const fields: TField[] = []

  return { fields, ready: true }
}

export default useSystemFields
