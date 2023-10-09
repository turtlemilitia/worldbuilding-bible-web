import React, {JSX} from "react";


interface TProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  placeholder?: string;
}

const PageTitleField = (props: TProps): JSX.Element => {
  const {value, onChange} = props;
  return (
    <input
      {...props}
      value={value}
      className="w-full font-display text-8xl border-none bg-transparent -mt-7 py-0 px-6 placeholder:text-stone-400 outline-none break-words text-center"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default PageTitleField