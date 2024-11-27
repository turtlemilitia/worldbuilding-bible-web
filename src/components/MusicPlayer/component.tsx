import { FunctionComponent, useState } from 'react'
import { ActivityIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react'

const MusicPlayer: FunctionComponent = () => {

  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 text-stone-200 px-3 py-3 backdrop-blur-sm cursor-pointer flex flex-row z-40`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ActivityIcon className={'h-5 w-5'}/>
      <div className={`${hovered ? 'w-80' : 'w-0'} transition-width duration-1000 whitespace-nowrap overflow-hidden flex justify-between`}>
        <div className="pl-2">Jakob Ahlbom - When It Rains It Pours</div>
        <div className="flex flex-row gap-2">
          <SkipBackIcon className={'h-5 w-5'}/>
          <PlayIcon className={'h-5 w-5'}/>
          <SkipForwardIcon className={'h-5 w-5'}/>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer;