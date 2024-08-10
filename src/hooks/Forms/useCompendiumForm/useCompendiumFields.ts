import { selectField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useCompendiumFields = (): TUseFields => {

  const {notebooks} = useNotebookIndexDataManager()

  const fields = useMemo(() => {
    const fields: TField[] = [];
    if (notebooks && notebooks.length > 0) {
      fields.push(
        selectField({
          name: 'notebook',
          label: 'Notebook',
          options: notebooks,
        })
      )
    }
    return fields;
  }, [notebooks]);

  return { fields, ready: true }
}

export default useCompendiumFields
