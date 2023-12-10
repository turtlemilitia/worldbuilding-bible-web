import React, { FunctionComponent, JSX } from 'react'
import { TLanguage } from '../../types'
import { InfoBar, TFields } from '../../components/InfoBar'

type TProps = {
  loading: boolean;
  setReady?: (value: boolean) => any;
  onChange: (key: string, value: any) => void;
  data: TLanguage;
}

const LanguageInfoBar: FunctionComponent<TProps> = ({ loading, onChange, setReady, data }: TProps): JSX.Element => {

  const fields: TFields[] = [
    //
  ]

  return (
    <InfoBar
      loading={loading}
      onChange={onChange}
      data={data}
      fields={fields}
    />
  )
}

export default LanguageInfoBar