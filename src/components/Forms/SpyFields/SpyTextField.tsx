import React, {JSX} from "react";


interface EmailFieldProps {
    value: string;
    onChange: (value: string) => void;
    type?: string;
    name?: string;
    placeholder?: string;
}

const SpyTextField = ({value, onChange, type, name, placeholder}: EmailFieldProps): JSX.Element => {
    return (
        <input
            className="w-full border-none bg-transparent px-6 py-3 text-inherit placeholder:text-slate-300 outline-none"
            type={type || 'text'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default SpyTextField