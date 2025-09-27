import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from 'lucide-react'
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer'

type TWebPlaybackProps = {
  open: boolean
  accessToken: string | null
}

const WebPlayback = ({ open, accessToken }: TWebPlaybackProps) => {

  const {
    currentTrack,
    isPaused,
    isActive,
    play,
    pause,
    next,
    previous,
  } = useSpotifyPlayer(accessToken)

  return (
    <div className={`${open || isActive
      ? 'w-80'
      : 'w-0'} transition-width duration-1000 whitespace-nowrap overflow-hidden flex justify-between`}>
      <div className="pl-2 max-w-96 overflow-hidden">{isActive && currentTrack
        ? `${currentTrack.artists?.[0]?.name} - ${currentTrack.name}`
        : ''}</div>
      <div className="flex flex-row gap-2">
        <button className={'h-5 w-5'} onClick={previous}>
          <SkipBackIcon className={'h-5 w-5'}/>
        </button>
        {(isPaused || !isActive) ? (
          <button className={'h-5 w-5'} onClick={play}>
            <PlayIcon className={'h-5 w-5'}/>
          </button>
        ) : (
          <button className={'h-5 w-5'} onClick={pause}>
            <PauseIcon className={'h-5 w-5'}/>
          </button>
        )}
        <button className={'h-5 w-5'} onClick={next}>
          <SkipForwardIcon className={'h-5 w-5'}/>
        </button>
      </div>
    </div>
  )
}

export default WebPlayback