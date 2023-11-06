import React, {JSX} from "react";


interface TProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PageTitleField = (props: TProps): JSX.Element => {
  const {value, onChange, placeholder} = props;
  return (
    <h1
      contentEditable
      className="w-full font-display text-8xl border-none bg-transparent -mt-3 py-0 px-6 placeholder:text-stone-400 outline-none break-words text-center"
      onBlur={(e) => onChange(e.currentTarget.innerHTML)}
    >{value || placeholder}</h1>
  )
}

export default PageTitleField