import React, { FunctionComponent, JSX, SyntheticEvent } from 'react'
import { RefreshCwIcon, SaveIcon } from 'lucide-react'

interface TProps {
  onSave: (event: SyntheticEvent) => void;
  onRefresh?: () => any;
}

const FormToolbar: FunctionComponent<TProps> = ({onSave, onRefresh}: TProps): JSX.Element => {
  const handleOnRefresh = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onRefresh && onRefresh()
  }
  const handleOnSave = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSave && onSave(event)
  }
  return (
    <div className="flex justify-end px-3 py-2">
      {onRefresh && (
        <button onClick={handleOnRefresh} className="mr-3">
          <RefreshCwIcon className="stroke-stone-400 h-5 w-5"/>
        </button>
      )}
      <button type="submit" onClick={handleOnSave}>
        <SaveIcon className="stroke-stone-400 h-5 w-5"/>
      </button>
    </div>
  )
}

export default FormToolbar;