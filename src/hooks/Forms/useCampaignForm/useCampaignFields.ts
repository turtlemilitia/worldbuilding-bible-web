import { selectField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useCompendiumIndexDataManager, useNotebookIndexDataManager } from '../../DataManagers'

const useCampaignFields = (): TUseFields => {

  const { compendia } = useCompendiumIndexDataManager()
  const {notebooks} = useNotebookIndexDataManager()

  const fields: TField[] = [
    selectField({
      name: 'compendium',
      label: 'Compendium',
      options: compendia ?? []
    })
  ]

  if (notebooks && notebooks.length > 0) {
    fields.push(
      selectField({
        name: 'notebook',
        label: 'Notebook',
        options: notebooks,
      })
    )
  }

  return { fields, ready: true }
}

export default useCampaignFields
