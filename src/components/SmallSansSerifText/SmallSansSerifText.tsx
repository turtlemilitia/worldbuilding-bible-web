import { FunctionComponent, PropsWithChildren } from 'react'

const SmallSansSerifText: FunctionComponent<PropsWithChildren> = ({children}) => {
  return <div className={'uppercase font-sans-serif tracking-widest text-xs'}>
    {children}
  </div>
}

export default SmallSansSerifText