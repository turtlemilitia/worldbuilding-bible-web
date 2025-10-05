import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon, SpeakerIcon,
} from 'lucide-react'
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer'
import { useContext, useEffect } from 'react'
import { MusicPlayerContext } from '@/pages/MusicPlayerProvider'

type TWebPlaybackProps = {
  open: boolean
}

const WebPlayback = ({ open }: TWebPlaybackProps) => {

  const {
    player,
    currentTrack,
    isPaused,
    isActive,
    play,
    pause,
    next,
    previous,
    activate,
    checkState
  } = useSpotifyPlayer()

  useEffect(() => {
    if (player) {
      checkState()
    }
  }, [player])

  return (
    <div className={`${open || !isPaused ? 'w-128' : 'w-0'} transition-width duration-1000 whitespace-nowrap overflow-hidden flex justify-between`}>
      <div className="pl-2 max-w-96 overflow-hidden mt-1">{currentTrack
        ? `${currentTrack.artists?.[0]?.name} - ${currentTrack.name}`
        : !isPaused ? 'Playing on another device' : ''}</div>
      <div className="flex flex-row gap-2">
        <button className={'h-5 w-5'} onClick={previous}>
          <SkipBackIcon className={'h-5 w-5'}/>
        </button>
        {(isPaused) ? (
          <button className={'h-5 w-5'} onClick={() => play()}>
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
        {(!isActive) && (
          <button className={'h-5 w-5'} onClick={activate}>
            <SpeakerIcon className={'h-5 w-5'}/>
          </button>
        )}
      </div>
    </div>
  )
}

export default WebPlayback