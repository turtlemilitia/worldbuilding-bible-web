import React, { FunctionComponent } from 'react'

type TProps = {
  value?: string;
  type?: string;
  onChange: (value: any) => any;
}
const TextField: FunctionComponent<TProps> = ({type, value, onChange}) => {
  return (
    <input
      className="w-full border-none py-2 px-4 bg-transparent text-inherit placeholder:text-slate-200 outline-none focus:bg-stone-800"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default TextField;