import { FunctionComponent } from 'react'
import { TSelectDialogProps } from '@/hooks/fieldTools/types'
import NoteDialog from './NoteDialog'
import EncounterDialog from './EncounterDialog'
import FactionDialog from './FactionDialog'
import LanguageDialog from './LanguageDialog'
import QuestDialog from './QuestDialog'
import SessionDialog from './SessionDialog'
import SceneDialog from './SceneDialog'
import CharacterDialog from "./CharacterDialog";
import LocationDialog from "./LocationDialog";
import ItemDialog from '@/components/Dialogs/ItemDialog'

const DialogFactory: FunctionComponent<TSelectDialogProps> =  (props) => {
  switch (props.type) {
    case 'note':
      return <NoteDialog
        {...props}
        noteId={props.id}
      />
    case 'encounter':
      return <EncounterDialog
        {...props}
        encounterId={props.id}
      />
    case 'faction':
      return <FactionDialog
        {...props}
        factionId={props.id}
      />
    case 'language':
      return <LanguageDialog
        {...props}
        languageId={props.id}
      />
    case 'location':
      return <LocationDialog
        {...props}
        locationId={props.id}
      />
    case 'character':
      return <CharacterDialog
        {...props}
        characterId={props.id}
      />
    case 'item':
      return <ItemDialog
        {...props}
        itemId={props.id}
      />
    case 'quest':
      return <QuestDialog
        {...props}
        questId={props.id}
      />
    case 'session':
      return <SessionDialog
        {...props}
        sessionId={props.id}
      />
    case 'scene':
      return <SceneDialog
        {...props}
        sceneId={props.id}
      />
  }
}

export default DialogFactory