import React, {DetailedHTMLProps, JSX, TextareaHTMLAttributes} from "react";


interface EmailFieldProps extends Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const DiscreetTextareaField = (props: EmailFieldProps): JSX.Element => {
  const {onChange} = props
  return (
    <textarea
      {...props}
      className="w-full border-none bg-transparent px-3 py-3 text-inherit placeholder:text-stone-400 outline-none"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default DiscreetTextareaField