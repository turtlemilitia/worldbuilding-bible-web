import { TGenericFieldParams } from '@/hooks/fieldTools/types'

export type TLinkField = TGenericFieldParams & {
  type: 'link'
}

export type TLinkFieldFn = (props: {
  name: TLinkField['name'],
  label: TLinkField['label'],
  required?: TLinkField['required']
}) => TLinkField

export const linkField: TLinkFieldFn = (props) => ({
  ...props,
  type: 'link',
})