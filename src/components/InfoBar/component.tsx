import React, { FunctionComponent, JSX } from 'react'
import FieldMapper from '../../components/Forms/Fields/FieldMapper'
import { FloatingBox } from '../FloatingBox'
import { TInfoBarProps } from './types'
import { TTypesAllowed } from '../../types'
import ProfileImage from '../ProfileImage'

const InfoBar: FunctionComponent<TInfoBarProps<TTypesAllowed>> = ({ loading, onChange, data, fields, profileImage, onProfileImageSelected }): JSX.Element => {

  if (fields.length === 0) {
    return <div/>;
  }

  return (
    <div
      className={`transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'}`}>
      <FloatingBox>
        {onProfileImageSelected && (
          <ProfileImage image={profileImage} onSelected={onProfileImageSelected}/>
        )}
        <ul>
          {fields.map(({ name, label, type, options, search, link }, index) => {
            const currentValue = data[name as keyof TTypesAllowed]
            return <FieldMapper
              key={index}
              name={name}
              label={label}
              type={type}
              options={options}
              currentValue={currentValue}
              onChange={onChange}
              search={search}
              link={link}
            />
          })}
        </ul>
      </FloatingBox>
    </div>
  )
}

export default InfoBar