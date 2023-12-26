import React, { FunctionComponent, JSX, PropsWithChildren } from 'react'
import { TPrimaryButtonProps } from './types'


const Button: FunctionComponent<TPrimaryButtonProps & PropsWithChildren> = ({children, type = 'button', onClick}): JSX.Element => {
    return (
        <button
          type={type}
          className="rounded-lg bg-stone-800 hover:bg-emerald-700 pl-10 pr-9 py-3 text-sm font-sans-serif uppercase tracking-widest text-white transition-colors duration-500"
          onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;