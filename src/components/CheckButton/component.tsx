import React, { FunctionComponent } from 'react'
import { CheckIcon } from 'lucide-react'
import { TCheckButtonProps } from './types'
import LoadingSpinner from '../LoadingSpinner'

const CheckButton: FunctionComponent<TCheckButtonProps> = ({ loading = false }) => {

  return (
    <button
      type="submit"
      className="rounded-full border border-yellow-500 shadow-lg shadow-stone-950 bg-emerald-800 hover:bg-emerald-700 px-4 py-4 transition-colors duration-300">
      {!loading ? (
        <CheckIcon size={30}/>
      ) : (
        <LoadingSpinner size={30}/>
      )}
    </button>
  )

}

export default CheckButton