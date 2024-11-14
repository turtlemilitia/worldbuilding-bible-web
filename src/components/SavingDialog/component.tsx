import { FunctionComponent } from 'react'
import { TSavingDialogProps } from './types'
import LoadingSpinner from '../LoadingSpinner'

const SavingDialog: FunctionComponent<TSavingDialogProps> = ({ saving }) => {

  return (

    <div className="relative flex w-full">
      <div className={`fixed z-10 top-0 right-0 pt-5`}>
        <div
          className={`transition-all duration-1000 ${saving ? 'top-0 opacity-100' : '-top-10 opacity-0'} w-full px-6`}>
          <div className={`rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 p-2 backdrop-blur-sm cursor-pointer flex flex-row`}>
            <div className="flex flex-row gap-2 text-xs text-stone-200">
              <div className="uppercase font-sans-serif ml-1">Saving...</div><LoadingSpinner/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingDialog