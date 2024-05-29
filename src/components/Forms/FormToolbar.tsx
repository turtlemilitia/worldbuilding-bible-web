import React, { FunctionComponent, JSX, SyntheticEvent } from 'react'
import { RefreshCwIcon, SaveIcon, TrashIcon } from 'lucide-react'

interface TProps {
  onSave?: (event: SyntheticEvent) => void,
  onDelete?: () => void,
  onRefresh?: () => any,
  canManuallySave?: boolean,
  canDelete?: boolean,
  canRefresh?: boolean
}

const FormToolbar: FunctionComponent<TProps> = ({
  canManuallySave = false,
  onRefresh,
  onSave,
  canDelete,
  onDelete,
  canRefresh
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
    <div className="flex justify-end px-3 py-2 gap-3">
      {canRefresh && onRefresh && (
        <button type="button" onClick={handleOnRefresh}>
          <RefreshCwIcon className="stroke-stone-400 h-5 w-5"/>
        </button>
      )}
      {canManuallySave && handleOnSave && (
        <button type="submit" onClick={handleOnSave}>
          <SaveIcon className="stroke-stone-400 h-5 w-5"/>
        </button>
      )}
      {canDelete && handleOnDelete && (
        <button type="button" onClick={handleOnDelete}>
          <TrashIcon className="stroke-stone-400 h-5 w-5"/>
        </button>
      )}
    </div>
  )
}

export default FormToolbar