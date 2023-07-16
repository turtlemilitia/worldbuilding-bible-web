import React, {JSX} from "react";


interface EmailFieldProps {
    value: string;
    onChange: (value: string) => void;
    type?: string;
    name?: string;
    placeholder?: string;
}

const GenericTextField = ({value, onChange, type, name, placeholder}: EmailFieldProps): JSX.Element => {
    return (
        <input
            className="w-full rounded-lg border-none bg-neutral-800 px-6 py-3 text-center text-inherit placeholder:text-slate-200 outline-none"
            type={type || 'text'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default GenericTextField