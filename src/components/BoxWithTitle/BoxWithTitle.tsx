import React, { JSX, PropsWithChildren } from 'react'
import { FloatingBox } from '../FloatingBox'
import { TFloatingBoxProps } from '@/components/FloatingBox/FloatingBox'

type TProps = {
  title?: string,
  subTitle?: string
} & TFloatingBoxProps
const BoxWithTitle = ({title, subTitle, children, ...props}: TProps & PropsWithChildren): JSX.Element => {
  return (
    <FloatingBox className={'w-96'} {...props}>
      {title && (
      <div className="mb-8 border-b border-b-yellow-500 pb-8 flex flex-col items-center">
        <h1 className="mb-2 text-xl font-sans-serif tracking-widest uppercase">{title}</h1>
        {subTitle && <span className="text-stone-300">{subTitle}</span>}
      </div>
      )}
      {children}
    </FloatingBox>
  )
}

export default BoxWithTitle;