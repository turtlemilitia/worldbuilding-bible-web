import React, { FunctionComponent, JSX } from 'react'
import FieldMapper from '../../components/Forms/Fields/FieldMapper'
import { FloatingBox } from '../FloatingBox'
import { TTypesAllowed } from '../../types'
import ProfileImage from '../ProfileImage'
import { Transition } from '@headlessui/react'
import { TField } from '../../hooks/fieldTools'

type TProps<T> = {
  onChange: (key: string, value: any) => void;
  data: T;
  fields?: TField[],
  profileImage?: string
  canHaveProfileImage?: boolean;
  onProfileImageSelected?: (imageId: number) => Promise<any>;
  disabled?: boolean
  loading: boolean
}

const InfoBar: FunctionComponent<TProps<any>> = ({
  onChange,
  data,
  fields = [],
  profileImage,
  canHaveProfileImage = false,
  onProfileImageSelected,
  disabled,
  loading
}): JSX.Element => {

  return (
    <Transition
      show={!loading}
      enter={'transition-all duration-1000'}
      enterFrom={'-top-10 opacity-0'}
      enterTo={'top-0 opacity-100'}
      leave={'transition-all duration-1000'}
      leaveFrom={'top-0 opacity-100'}
      leaveTo={'-top-10 opacity-0'}
    >
      <FloatingBox className={canHaveProfileImage && onProfileImageSelected ? 'mt-32' : ''}>
        {canHaveProfileImage && onProfileImageSelected && (
          <ProfileImage image={profileImage} onSelected={onProfileImageSelected}/>
        )}
        <ul className="font-serif text-serif-md leading-tight ">
          {fields.map((props, index) => {
            const currentValue = data ? data[props.name as keyof TTypesAllowed] : null
            return <FieldMapper
              key={index}
              currentValue={currentValue}
              onChange={onChange}
              disabled={disabled}
              {...props}
            />
          })}
        </ul>
      </FloatingBox>
    </Transition>
  )
}

export default InfoBar
