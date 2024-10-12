import { noteField, selectField, TField } from '../../fieldTools'
import { TUseFields } from '@/components/Post/types'
import { useNoteIndexDataManager, useQuestDataManager, useQuestTypeIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useQuestFields = (): TUseFields => {

  const { questTypes: types } = useQuestTypeIndexDataManager()
  const manager = useQuestDataManager();
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
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

    if (manager.quest && notes) {
      fields.push(
        noteField({
          options: notes,
        })
      )
    }

    return fields;
  }, [manager.quest, manager.campaign?.quests, notes])

  return { fields }
}

export default useQuestFields
