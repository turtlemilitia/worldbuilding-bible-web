import React, {JSX} from "react";
import GenericTextField from "./GenericTextField";


interface EmailFieldProps {
    value: string;
    onChange: (value: string) => void;
    name?: string;
    placeholder?: string;
}

const EmailField = ({value, onChange, name, placeholder}: EmailFieldProps): JSX.Element => {
    return (
        <GenericTextField
            value={value}
            onChange={onChange}
            type={'email'}
            name={name || 'email'}
            placeholder={placeholder || "your@email.com"}
        />
    )
}

export default EmailField