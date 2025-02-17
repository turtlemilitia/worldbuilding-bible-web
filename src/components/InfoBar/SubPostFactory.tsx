import { TDialogTypes } from '@/hooks/fieldTools/types'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { NoteSubPost } from '@/components/InfoBar/NoteSubPost'
import { EncounterSubPost } from '@/components/InfoBar/EncounterSubPost'
import { SceneSubPost } from '@/components/InfoBar/SceneSubPost'
import { QuestSubPost } from '@/components/InfoBar/QuestSubPost'
import React from 'react'

export function SubPostFactory ({ dialogType, value, ...props }: {
  dialogType?: TDialogTypes,
  value: TSelectOption,
  unlink: () => any,
}) {
  switch (dialogType) {
    case 'note':
      return <NoteSubPost noteId={value.id} {...props}/>
    case 'encounter':
      return <EncounterSubPost encounterId={value.id}  {...props}/>
    case 'scene':
      return <SceneSubPost sceneId={value.id}  {...props}/>
    case 'quest':
      return <QuestSubPost questId={value.id}  {...props}/>
    default:
      return <></>
  }
}