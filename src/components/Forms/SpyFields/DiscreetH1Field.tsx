import React, {JSX} from "react";


interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  placeholder?: string;
}

const DiscreetH1Field = (props: EmailFieldProps): JSX.Element => {
  const {onChange} = props;
  return (
    <input
      {...props}
      className="w-full text-7xl border-none bg-transparent px-6 py-3 text-white placeholder:text-stone-400 outline-none text-center break-words"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default DiscreetH1Field