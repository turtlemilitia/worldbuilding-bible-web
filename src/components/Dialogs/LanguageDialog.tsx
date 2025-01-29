import { TLanguage } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useLanguageForm } from '../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  languageId: string | number;
  onCreated?: (data: TLanguage) => any
  onUpdated?: (data: TLanguage) => any
  onDeleted?: (id: string | number) => any
}
const LanguageDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  languageId,
  onCreated,
  onUpdated,
  onDeleted,
}) => {

  const { compendium } = useCurrentCompendium()

  const form = useLanguageForm({
    compendiumId: compendium?.id,
    languageId: fixId(languageId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(languageId)
    },
  })

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
