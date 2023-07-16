import React, {JSX} from "react";
import GenericTextField from "./GenericTextField";

interface PasswordFieldProps {
    value: string;
    onChange: (value: string) => void;
    name?: string;
    placeholder?: string;
}

const PasswordField = ({value, onChange, name, placeholder}: PasswordFieldProps): JSX.Element => {
    return (
        <GenericTextField
            value={value}
            onChange={onChange}
            type={'password'}
            name={name || 'password'}
            placeholder={placeholder || '********'}
        />
    )
}

export default PasswordField;