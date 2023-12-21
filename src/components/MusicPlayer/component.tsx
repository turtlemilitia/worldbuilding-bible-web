import { FunctionComponent, useState } from 'react'
import { ActivityIcon } from 'lucide-react'

const MusicPlayer: FunctionComponent = () => {

  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-md shadow-sm shadow-stone-800 bg-stone-400 bg-opacity-10 text-stone-200 px-4 py-2 backdrop-blur-sm cursor-pointer flex flex-row`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ActivityIcon size={15}/>
      <div className={`${hovered ? 'w-96' : 'w-0'} transition-width duration-1000 whitespace-nowrap overflow-hidden`}>&nbsp; TODO: Music Banner Here</div>
    </div>
  )
}

export default MusicPlayer;