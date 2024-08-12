import { TLanguage } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useLanguageForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  languageId: TLanguage['slug'];
  onCreated?: (data: TLanguage) => any
  onUpdated?: (data: TLanguage) => any
  onDeleted?: (id: string|number) => any
}
const LanguageDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  languageId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useLanguageForm({
    languageId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(languageId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Language'}
      form={form}
    />
  )
}

export default LanguageDialog
