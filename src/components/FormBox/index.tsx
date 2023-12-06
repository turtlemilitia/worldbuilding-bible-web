import React, { JSX, PropsWithChildren } from 'react'

type TProps = {
  title: string,
  subTitle: string
}
const Index = ({title, subTitle, children}: TProps & PropsWithChildren): JSX.Element => {
  return (
    <div className="w-96 rounded-3xl shadow-lg shadow-stone-950 bg-stone-400 px-8 py-10 bg-opacity-50 backdrop-blur-md max-sm:px-8">
      <div className="text-white">
        <div className="mb-8 border-b border-b-yellow-500 pb-8 flex flex-col items-center">
          <h1 className="mb-2 text-xl font-sans-serif tracking-widest uppercase">{title}</h1>
          <span className="text-stone-300">{subTitle}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Index;