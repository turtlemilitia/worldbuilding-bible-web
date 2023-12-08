import React, { FunctionComponent } from 'react'

type TProps = {
  value?: string;
  type?: string;
  onChange: (value: any) => any;
}
const TextField: FunctionComponent<TProps> = ({type, value, onChange }) => {
  return (
    <input
      className="w-full px-4 py-2 rounded-lg border-none bg-stone-700 bg-opacity-50 focus:bg-stone-800 text-inherit placeholder:text-slate-200 outline-none"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default TextField;