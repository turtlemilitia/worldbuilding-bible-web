// other generic fields
import { TSelectFieldProps } from '@/hooks/fieldTools/types'
import { PenIcon } from 'lucide-react'
import { multiEditorField } from '@/hooks/fieldTools/fieldTools'

export const noteField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiEditorField({
  name: 'notes',
  label: 'Notes',
  required,
  options,
  link,
  dialogType: 'note',
  Icon: PenIcon,
})