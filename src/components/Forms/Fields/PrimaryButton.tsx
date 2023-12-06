import React, { FunctionComponent, JSX, PropsWithChildren } from 'react'


const PrimaryButton: FunctionComponent<PropsWithChildren> = ({children}): JSX.Element => {
    return (
        <button type="submit"
                className="rounded-full border border-stone-400 bg-emerald-800 hover:bg-emerald-700 pl-10 pr-9 py-3 text-sm font-serif font-bold uppercase tracking-widest text-white transition-colors duration-300">
            {children}
        </button>
    );
}

export default PrimaryButton;