import React, { FunctionComponent, JSX, SyntheticEvent } from 'react'
import { RefreshCwIcon, SaveIcon, StarIcon, TrashIcon } from 'lucide-react'
import { CoverImagePicker } from '../CoverImagePicker'
import { SmallFloatingBox } from '../FloatingBox'
import { Button } from '@headlessui/react'
import { PinForSelector } from '../PinPicker'
import { TFavouriteHandler, TPinHandler, TPlayerCharacterHandler } from '../Post/types'
import PlayerCharacterSelector from '../PlayerCharacterSelector'

type TProps = {
  canEdit?: boolean
  canManuallySave?: boolean,
  canDelete?: boolean,
  canRefresh?: boolean
  onSave?: (event: SyntheticEvent) => void,
  onDelete?: () => void,
  onRefresh?: () => any,
  pinHandler?: TPinHandler;
  favouriteHandler?: TFavouriteHandler,
  playerCharacterHandler?: TPlayerCharacterHandler,
  onCoverImageSelected?: (imageId: number) => Promise<any>;
}

const FormToolbar: FunctionComponent<TProps> = ({
  canEdit = false,
  canManuallySave = false,
  canDelete,
  canRefresh,
  onRefresh,
  onSave,
  onDelete,
  pinHandler,
  favouriteHandler,
  playerCharacterHandler,
  onCoverImageSelected
}: TProps): JSX.Element => {

  const handleOnRefresh = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onRefresh && onRefresh()
  }
  const handleOnSave = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onSave && onSave(event)
  }
  const handleOnDelete = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onDelete && onDelete()
  }

  return (
    <div className="flex justify-end mb-3 gap-3">
      {pinHandler?.canPin && (
        <PinForSelector pinHandler={pinHandler}/>
      )}
      {favouriteHandler && (
        <Button onClick={favouriteHandler.toggleFavourite}>
          <SmallFloatingBox hover className={favouriteHandler.isFavourited ? 'bg-opacity-100' : ''}>
            <StarIcon className={`${favouriteHandler.isFavourited ? 'stroke-stone-800 hover:stroke-stone-400' : 'stroke-stone-400'} h-5 w-5`}/>
          </SmallFloatingBox>
        </Button>
      )}
      {playerCharacterHandler && (
        <PlayerCharacterSelector handler={playerCharacterHandler}/>
      )}
      {canEdit && (
        <>
          {onCoverImageSelected && (
            <CoverImagePicker onCoverImageSelected={onCoverImageSelected}/>
          )}
          {canRefresh && onRefresh && (
            <Button onClick={handleOnRefresh}>
              <SmallFloatingBox hover>
                <RefreshCwIcon className="stroke-stone-400 h-5 w-5"/>
              </SmallFloatingBox>
            </Button>
          )}
          {canManuallySave && handleOnSave && (
            <Button onClick={handleOnSave}>
              <SmallFloatingBox hover>
                <SaveIcon className="stroke-stone-400 h-5 w-5"/>
              </SmallFloatingBox>
            </Button>
          )}
          {canDelete && handleOnDelete && (
            <Button onClick={handleOnDelete}>
              <SmallFloatingBox hover>
                <TrashIcon className="stroke-stone-400 h-5 w-5"/>
              </SmallFloatingBox>
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default FormToolbar