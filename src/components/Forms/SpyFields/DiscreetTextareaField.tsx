import React, {JSX} from "react";
import SimpleMdeReact from 'react-simplemde-editor'

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const DiscreetTextareaField = (props: EmailFieldProps): JSX.Element => {
  const {placeholder} = props
  return (
    <SimpleMdeReact
      {...props}
      textareaProps={{
        placeholder,
        className: "w-full border-none bg-transparent px-3 py-3 text-inherit placeholder:text-stone-400 outline-none"
      }}
    />
  )
}

export default DiscreetTextareaField