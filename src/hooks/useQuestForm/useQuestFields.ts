import useFields, { TField } from '../useFields'
import { TQuest, TCompendium, TNote, TCampaign } from '../../types'
import { TUseFields } from '../../components/Post/types'
import { useContext, useEffect, useState } from 'react'
import { QuestWrapperContext } from '../../components/QuestWrapper/component'

type TProps = {
  campaign?: TCampaign,
  quest?: TQuest,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useQuestFields = ({ campaign, quest, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const [ready, setReady] = useState<boolean>(false)

  const types = useContext(QuestWrapperContext)

  useEffect(() => {

    if (types !== undefined) {
      setReady(true)
    }

  }, [types])

  const { selectField, noteField } = useFields()

  const fields: TField[] = [
    selectField({ name: 'type', label: 'Type', options: types ?? [] })
  ]

  if (campaign?.quests.length) {
    fields.push(
      selectField({
        name: 'parent',
        label: 'Parent',
        options: campaign?.quests.filter(campaignQuest => campaignQuest.id !== quest?.id) ?? []
      })
    )
  }

  if (quest && campaign?.notebook) {
    fields.push(
      noteField({
        notableType: 'quests',
        notable: quest,
        notebookId: campaign?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready }
}

export default useQuestFields
