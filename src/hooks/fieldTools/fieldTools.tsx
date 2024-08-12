import {
  TAsyncMultiSelectFieldFn,
  TMultiSelectFieldFn,
  TNumberFieldFn,
  TSelectFieldFn,
  TSelectFieldProps,
  TTextFieldFn
} from './types'

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
export const noteField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'notes',
  label: 'Notes',
  required,
  options,
  link,
  dialogType: 'note'
})

export const sessionField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'sessions',
  label: 'Sessions',
  required,
  options,
  link,
  // Dialog: (props) =>
  //   <SessionDialog
  //     {...props}
  //     sessionId={props.id}
  //   />
})

export const questField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'quests',
  label: 'Quests',
  required,
  options,
  link,
  // Dialog: (props) =>
  //   <EncounterDialog
  //     {...props}
  //     encounterId={props.id}
  //   />
})

export const encounterField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'encounters',
  label: 'Encounters',
  required,
  options,
  link,
  // Dialog: (props) =>
  //   <EncounterDialog
  //     {...props}
  //     encounterId={props.id}
  //   />
})

// other generic fields
export const factionField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiSelectField({
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

export const languageField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiSelectField({
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
