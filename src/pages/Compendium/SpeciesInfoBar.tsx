import React, { FunctionComponent, JSX } from 'react'
import { TCharacter } from '../../types'
import { InfoBar, TFields } from '../../components/InfoBar'

type TProps = {
  loading: boolean;
  setReady?: (value: boolean) => any;
  onChange: (key: string, value: any) => void;
  data: TCharacter;
}

const CharacterInfoBar: FunctionComponent<TProps> = ({ loading, onChange, setReady, data }: TProps): JSX.Element => {

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

export default CharacterInfoBar