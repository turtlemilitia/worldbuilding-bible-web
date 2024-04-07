import React, { FunctionComponent, JSX } from 'react'
import FieldMapper from '../../components/Forms/Fields/FieldMapper'
import { FloatingBox } from '../FloatingBox'
import { TInfoBarProps } from './types'
import { TTypesAllowed } from '../../types'
import ProfileImage from '../ProfileImage'
import { Transition } from '@headlessui/react'

const InfoBar: FunctionComponent<TInfoBarProps<any>> = ({ loading, onChange, data, fields, profileImage, onProfileImageSelected, disabled }): JSX.Element => {

  return (
    <Transition
      show={fields.length > 0 && !loading}
      enter={'transition-all duration-1000'}
      enterFrom={'-top-10 opacity-0'}
      enterTo={'top-0 opacity-100'}
      leave={'transition-all duration-1000'}
      leaveFrom={'top-0 opacity-100'}
      leaveTo={'-top-10 opacity-0'}
    >
      <FloatingBox>
        {onProfileImageSelected && (
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