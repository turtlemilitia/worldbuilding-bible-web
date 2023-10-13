import {FunctionComponent} from "react";

type TProps = {
  checked: boolean
}
const Checkbox: FunctionComponent<TProps> = ({checked}) => {
  return (
    <span className='flex items-center h-10 rounded'>
      <input type='checkbox' checked={checked} className='hidden'/>
      <label
        className={`flex items-center justify-center w-5 h-5 text-transparent border-2 ${checked ? 'border-emerald-700' : 'border-stone-300'} rounded-full ${checked ? 'bg-emerald-500' : ''}`}>
        <svg
          className={"w-4 h-4 fill-current"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          >
          </path>
        </svg>
      </label>
    </span>
  )
}

export default Checkbox;
