import React, { FunctionComponent, JSX, useMemo } from 'react'
import clsx from 'clsx'
import FieldMapper from '../../components/Forms/Fields/FieldMapper'
import { FloatingBox } from '../FloatingBox'
import { TTypesAllowed } from '@/types'
import ProfileImage from '../ProfileImage'
import { Transition } from '@headlessui/react'
import { TField } from '@/hooks/fieldTools'
import isEmpty from '@/utils/isEmpty'

type TProps<T> = {
  onChange: (key: string, value: any) => void;
  data: T;
  fields?: TField[],
  profileImage?: string
  canHaveProfileImage?: boolean;
  openProfileImagePicker?: () => any;
  disabled?: boolean
  loading: boolean
}

const InfoBar: FunctionComponent<TProps<any>> = ({
  onChange,
  data,
  fields = [],
  profileImage,
  canHaveProfileImage = false,
  openProfileImagePicker,
  disabled,
  loading
}): JSX.Element => {

  const filteredFields = fields.filter((props) => {
    const currentValue = data ? data[props.name as keyof TTypesAllowed] : null
    return !(disabled && isEmpty(currentValue))
  })

  return (
    <Transition show={!loading && filteredFields.length > 0}>
      <div className={clsx([
        `transition-all duration-1000`,
        'data-[closed]:-top-10 data-[closed]:opacity-0',
      ])}>
        <FloatingBox className={`${canHaveProfileImage && openProfileImagePicker ? 'mt-32' : ''}`}>
          {canHaveProfileImage && openProfileImagePicker && (
            <ProfileImage image={profileImage} openPicker={openProfileImagePicker}/>
          )}
          <ul className="font-serif text-serif-md leading-tight max-h-[50vh] overflow-y-scroll overflow-x-clip">
            {filteredFields.map((props, index) => {
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
      </div>
    </Transition>
  )
}

export default InfoBar
