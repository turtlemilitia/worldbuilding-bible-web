import React, { JSX } from 'react'
import { Copyright } from 'lucide-react'

const Footer: React.FunctionComponent = (): JSX.Element => {

  return (
    <div className="bg-stone-300 py-2 text-xs">
      <div className="flex justify-between px-5">
        <div>
          <Copyright className="inline-block h-4 w-4"/> 2023 Don't take this anywhere..!
        </div>
        <div>
          Filipe Fonseca
        </div>
      </div>
    </div>
  )

}

export default Footer