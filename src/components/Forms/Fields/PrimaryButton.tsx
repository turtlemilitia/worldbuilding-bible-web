import React, {JSX} from "react";

interface PrimaryButtonParams {
    text: string;
}

const PrimaryButton = ({text}: PrimaryButtonParams): JSX.Element => {
    return (
        <button type="submit"
                className="rounded-full border border-gray-400 bg-emerald-800 hover:bg-emerald-700 pl-10 pr-9 py-3 text-sm font-display font-bold uppercase tracking-widest text-white transition-colors duration-300">
            {text}
        </button>
    );
}

export default PrimaryButton;