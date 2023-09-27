import {FunctionComponent} from "react";

type TProps = {
  checked: boolean,
  color: 'red' | 'blue'
}
const Checkbox: FunctionComponent<TProps> = ({checked, color}) => {

  return (
    <input checked={checked}
           type="checkbox"
           className={`w-4 h-4 text-${color}-600 bg-gray-100 border-gray-300 rounded focus:ring-${color}-500 dark:focus:ring-${color}-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
    />
  )
}

export default Checkbox;
