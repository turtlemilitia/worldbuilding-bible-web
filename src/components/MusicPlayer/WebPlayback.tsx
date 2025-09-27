import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon, SpeakerIcon,
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
    activate,
  } = useSpotifyPlayer(accessToken)

  return (
    <div className={`${open || isActive ? 'w-128' : 'w-0'} transition-width duration-1000 whitespace-nowrap overflow-hidden flex justify-between`}>
      <div className="pl-2 max-w-96 overflow-hidden mt-1">{currentTrack
        ? `${currentTrack.artists?.[0]?.name} - ${currentTrack.name}`
        : ''}</div>
      {(isActive) ? (
        <div className="flex flex-row gap-2">
          <button className={'h-5 w-5'} onClick={previous}>
            <SkipBackIcon className={'h-5 w-5'}/>
          </button>
          {(isPaused) ? (
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
      ) : (
        <button className={'h-5 w-5'} onClick={activate}>
          <SpeakerIcon className={'h-5 w-5'}/>
        </button>
      )}
    </div>
  )
}

export default WebPlayback