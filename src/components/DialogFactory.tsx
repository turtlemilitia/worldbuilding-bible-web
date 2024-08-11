import { FunctionComponent } from 'react'
import { TSelectDialogProps } from '../hooks/fieldTools/types'
import NoteDialog from './NoteDialog'

const DialogFactory: FunctionComponent<TSelectDialogProps> =  (props) => {
  switch (props.type) {
    case 'note':
      return <NoteDialog
        {...props}
        noteId={props.id}
      />
  }
}

export default DialogFactory