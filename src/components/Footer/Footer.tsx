import React, { JSX } from 'react'
import { CopyrightIcon } from 'lucide-react'
import { MusicPlayer } from '../MusicPlayer'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const Footer: React.FunctionComponent = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  return (
    <div className="bg-stone-200 py-2 text-xs">
      <div className="flex justify-between px-5">
        {token && (
          <MusicPlayer/>
        )}
        <div>
          <CopyrightIcon className="inline-block h-4 w-4"/> 2023 Don't take this anywhere..!
        </div>
        <div>
          Filipe Fonseca
        </div>
      </div>
    </div>
  )

}

export default Footer