import { noteField, selectField, TField } from '../../fieldTools'
import { TUseFields } from '../../../components/Post/types'
import { useNotebookDataManager, useQuestDataManager, useQuestTypeIndexDataManager } from '../../DataManagers'

const useQuestFields = (): TUseFields => {

  const { questTypes: types } = useQuestTypeIndexDataManager()
  const manager = useQuestDataManager();
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = [
    selectField({
      name: 'type',
      label: 'Type',
      options: types ?? []
    })
  ]

  if (manager.campaign?.quests.length) {
    fields.push(
      selectField({
        name: 'parent',
        label: 'Parent',
        options: manager.campaign?.quests.filter(campaignQuest => campaignQuest.id !== manager.quest?.id) ?? []
      })
    )
  }

  if (manager.quest && manager.campaign?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useQuestFields