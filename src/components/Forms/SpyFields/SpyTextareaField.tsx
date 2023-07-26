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
        <textarea
            className="w-full border-none bg-transparent px-6 py-3 text-inherit placeholder:text-slate-300 outline-none"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default SpyTextField