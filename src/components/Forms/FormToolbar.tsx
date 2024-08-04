import React, { FunctionComponent, JSX, SyntheticEvent } from 'react'
import { RefreshCwIcon, SaveIcon, TrashIcon } from 'lucide-react'
import { CoverImagePicker } from '../CoverImagePicker'
import { SmallFloatingBox } from '../FloatingBox'

type TProps = {
  onSave?: (event: SyntheticEvent) => void,
  onDelete?: () => void,
  onRefresh?: () => any,
  canManuallySave?: boolean,
  canDelete?: boolean,
  canRefresh?: boolean
  onCoverImageSelected?: (imageId: number) => Promise<any>;
}

const FormToolbar: FunctionComponent<TProps> = ({
  canManuallySave = false,
  onRefresh,
  onSave,
  canDelete,
  onDelete,
  canRefresh,
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
      {onCoverImageSelected && (
        <CoverImagePicker onCoverImageSelected={onCoverImageSelected}/>
      )}
      {canRefresh && onRefresh && (
        <button type="button" onClick={handleOnRefresh}>
          <SmallFloatingBox>
            <RefreshCwIcon className="stroke-stone-400 h-5 w-5"/>
          </SmallFloatingBox>
        </button>
      )}
      {canManuallySave && handleOnSave && (
        <button type="submit" onClick={handleOnSave}>
          <SmallFloatingBox>
            <SaveIcon className="stroke-stone-400 h-5 w-5"/>
          </SmallFloatingBox>
        </button>
      )}
      {canDelete && handleOnDelete && (
        <button type="button" onClick={handleOnDelete}>
          <SmallFloatingBox>
            <TrashIcon className="stroke-stone-400 h-5 w-5"/>
          </SmallFloatingBox>
        </button>
      )}
    </div>
  )
}

export default FormToolbar