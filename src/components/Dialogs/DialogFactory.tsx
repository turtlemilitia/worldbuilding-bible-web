import { FunctionComponent } from 'react'
import { TSelectDialogProps } from '../../hooks/fieldTools/types'
import NoteDialog from './NoteDialog'
import EncounterDialog from './EncounterDialog'
import FactionDialog from './FactionDialog'
import LanguageDialog from './LanguageDialog'
import QuestDialog from './QuestDialog'
import SessionDialog from './SessionDialog'

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
  }
}

export default DialogFactory