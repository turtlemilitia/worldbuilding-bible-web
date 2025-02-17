import { TDialogTypes } from '@/hooks/fieldTools/types'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { NoteSubPost } from '@/components/InfoBar/NoteSubPost'
import { EncounterSubPost } from '@/components/InfoBar/EncounterSubPost'
import { SceneSubPost } from '@/components/InfoBar/SceneSubPost'
import { QuestSubPost } from '@/components/InfoBar/QuestSubPost'
import React from 'react'
import { FactionSubPost } from '@/components/InfoBar/FactionSubPost'
import { LocationSubPost } from '@/components/InfoBar/LocationSubPost'
import { CharacterSubPost } from '@/components/InfoBar/CharacterSubPost'

export function SubPostFactory ({ dialogType, value, ...props }: {
  dialogType?: TDialogTypes,
  value: TSelectOption,
  unlink: () => any,
  disabled?: boolean,
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
    case 'faction':
      return <FactionSubPost factionId={value.id}  {...props}/>
    case 'location':
      return <LocationSubPost locationId={value.id}  {...props}/>
    case 'character':
      return <CharacterSubPost characterId={value.id}  {...props}/>
    default:
      return <></>
  }
}