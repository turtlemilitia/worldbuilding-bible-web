import React, { JSX, PropsWithChildren } from 'react'

type TProps = {
  title: string,
  subTitle: string
}
const Index = ({title, subTitle, children}: TProps & PropsWithChildren): JSX.Element => {
  return (
    <div className="w-96 rounded-3xl border border-yellow-500 shadow-sm shadow-stone-800 bg-neutral-800 px-8 py-10 bg-opacity-50 backdrop-blur-lg max-sm:px-8">
      <div className="text-white">
        <div className="mb-8 border-b border-b-yellow-500 pb-8 flex flex-col items-center">
          <h1 className="mb-2 text-2xl">{title}</h1>
          <span className="text-stone-300">{subTitle}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Index;