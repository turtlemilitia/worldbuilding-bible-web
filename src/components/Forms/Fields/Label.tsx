import { Label as HeadlessLabel } from '@headlessui/react'
import React, { FunctionComponent, PropsWithChildren } from 'react'

type TProps = {
  className?: string
  required?: boolean;
}
const Label: FunctionComponent<TProps & PropsWithChildren> = ({ required, children }) => {
  return <HeadlessLabel
    className="font-sans-serif z-10 absolute -top-5 left-3 w-full overflow-ellipsis py-2 text-stone-300 uppercase tracking-widest text-sm">
    {children}{required ?
    <span className="text-red-600">*</span> : ''}:
  </HeadlessLabel>
}

export default Label