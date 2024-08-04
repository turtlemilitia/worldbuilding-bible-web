import React, { FunctionComponent, JSX } from 'react'
import FieldMapper from '../../components/Forms/Fields/FieldMapper'
import { FloatingBox } from '../FloatingBox'
import { TInfoBarProps } from './types'
import { TTypesAllowed } from '../../types'
import ProfileImage from '../ProfileImage'

const InfoBar: FunctionComponent<TInfoBarProps<any>> = ({ onChange, data, fields = [], profileImage, canHaveProfileImage = false, onProfileImageSelected, disabled }): JSX.Element => {

  return (
    <FloatingBox>
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
  )
}

export default InfoBar
