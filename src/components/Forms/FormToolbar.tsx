import React, { FunctionComponent, JSX, SyntheticEvent } from 'react'
import { RefreshCwIcon, SaveIcon } from 'lucide-react'

interface TProps {
  onSave: (event: SyntheticEvent) => void;
  onRefresh?: () => any;
  canManuallySave?: boolean
}

const FormToolbar: FunctionComponent<TProps> = ({canManuallySave = false, onRefresh, onSave}: TProps): JSX.Element => {
  const handleOnRefresh = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onRefresh && onRefresh()
  }
  const handleOnSave = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSave && onSave(event)
  }
  return (
    <div className="flex justify-end px-3 py-2 gap-3">
      {onRefresh && (
        <button onClick={handleOnRefresh}>
          <RefreshCwIcon className="stroke-stone-400 h-5 w-5"/>
        </button>
      )}
      {canManuallySave && handleOnSave && (
        <button type="submit" onClick={handleOnSave}>
          <SaveIcon className="stroke-stone-400 h-5 w-5"/>
        </button>
      )}
    </div>
  )
}

export default FormToolbar;