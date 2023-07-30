import React, { FunctionComponent, JSX, SyntheticEvent } from 'react'
import { RefreshCw, Save } from 'lucide-react'

interface TProps {
  onSave: (event: SyntheticEvent) => void;
  onRefresh: () => any;
}

const FormToolbar: FunctionComponent<TProps> = ({onSave, onRefresh}: TProps): JSX.Element => {
  return (
    <div className="flex justify-end px-3 py-2">
      <button onClick={onRefresh} className="mr-3">
        <RefreshCw className="stroke-stone-700 h-5 w-5"/>
      </button>
      <button type="submit" onClick={onSave}>
        <Save className="stroke-stone-700 h-5 w-5"/>
      </button>
    </div>
  )
}

export default FormToolbar;