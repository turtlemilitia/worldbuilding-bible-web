import { noteField, TField } from '../../fieldTools'
import { TUseFields } from '../../../components/Post/types'
import { useFactionDataManager, useNotebookDataManager } from '../../DataManagers'
import { multiSelectField } from '../../fieldTools/fieldTools'

const useFactionFields = (): TUseFields => {

  const manager = useFactionDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.compendium) {
    multiSelectField({
      label: 'Characters',
      name: 'characters',
      options: manager.compendium?.characters || []
    })
  }
  if (manager.faction && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useFactionFields
