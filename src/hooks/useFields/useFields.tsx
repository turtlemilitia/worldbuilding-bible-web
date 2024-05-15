import React from 'react'
import { TAsyncMultiSelectFieldFn, TNoteFieldFn, TNumberFieldFn, TSelectFieldFn, TTextFieldFn } from './types'
import NoteDialog from '../../components/NoteDialog'
import { attachNoteToEntity } from '../../services/NotableService'
import { indexNotes } from '../../services/NoteService'

const useFields = () => {

  const textField: TTextFieldFn = (props) => ({
    ...props,
    type: 'text'
  })
  const numberField: TNumberFieldFn = (props) => ({
    ...props,
    type: 'number'
  })
  const selectField: TSelectFieldFn = (props) => ({
    ...props,
    type: 'select',
  })
  const asyncMultiSelectField: TAsyncMultiSelectFieldFn = (props) => ({
    ...props,
    type: 'asyncMultiSelect',
  })

  // other generic fields
  const noteField: TNoteFieldFn = ({ notableType, notable, notebookId, onCreated, onUpdated, }) => asyncMultiSelectField({
    name: 'notes',
    label: 'Notes',
    search: (term) => indexNotes(notebookId, { search: term })
      .then(response => response.data.data.map(note => ({
        id: note.id,
        slug: note.slug,
        name: note.name
      }))),
    Dialog: (props) =>
      <NoteDialog
        {...props}
        noteId={props.id}
        notebookId={notebookId}
        onCreated={(noteData) => {
          attachNoteToEntity(notableType, notable.slug, { noteId: noteData.id })
            .then(() => onCreated && onCreated(noteData))
        }}
        onUpdated={(noteData) => onUpdated && onUpdated(noteData)}
      />
    // todo onDelete
  })

  return {
    textField,
    numberField,
    selectField,
    asyncMultiSelectField,

    noteField
  }
}

export default useFields
