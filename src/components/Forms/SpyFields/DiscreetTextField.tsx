import React, {JSX} from "react";


interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  placeholder?: string;
}

const DiscreetTextField = (props: EmailFieldProps): JSX.Element => {
  const {onChange} = props
  return (
    <input
      {...props}
      className='w-full border-none bg-transparent px-6 py-3 text-inherit placeholder:text-stone-400 outline-none'
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default DiscreetTextField