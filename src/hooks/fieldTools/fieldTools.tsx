import React from 'react'
import {
  TAsyncMultiSelectFieldFn, TFactionFieldFn, TLanguageFieldFn,
  TMultiSelectFieldFn,
  TNoteFieldFn,
  TNumberFieldFn,
  TSelectFieldFn,
  TTextFieldFn
} from './types'
import NoteDialog from '../../components/NoteDialog'

export const textField: TTextFieldFn = (props) => ({
  ...props,
  type: 'text'
})
export const numberField: TNumberFieldFn = (props) => ({
  ...props,
  type: 'number'
})
export const selectField: TSelectFieldFn = (props) => ({
  ...props,
  type: 'select',
})
export const multiSelectField: TMultiSelectFieldFn = (props) => ({
  ...props,
  type: 'multiSelect',
})
export const asyncMultiSelectField: TAsyncMultiSelectFieldFn = (props) => ({
  ...props,
  type: 'asyncMultiSelect',
})

// other generic fields
export const noteField: TNoteFieldFn = ({
  required,
  options,
  link,
}) => multiSelectField({
  name: 'notes',
  label: 'Notes',
  required,
  options,
  link,
  Dialog: (props) =>
    <NoteDialog
      {...props}
      noteId={props.id}
    />
})

export const factionField: TFactionFieldFn = ({
  required,
  options,
  link
}) => multiSelectField({
  name: 'factions',
  label: 'Factions',
  required,
  options,
  link,
  // Dialog: (props) =>
  //   <FactionDialog
  //     {...props}
  //     factionId={props.id}
  //     notableDataManager={notableDataManager}
  //   />
})

export const languageField: TLanguageFieldFn = ({
  required,
  options,
  link
}) => multiSelectField({
  name: 'languages',
  label: 'Languages',
  required,
  options,
  link,
  // Dialog: (props) =>
  //   <LanguageDialog
  //     {...props}
  //     languageId={props.id}
  //     notableDataManager={notableDataManager}
  //   />
})
