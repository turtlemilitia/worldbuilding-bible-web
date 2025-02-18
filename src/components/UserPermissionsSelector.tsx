import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { CheckIcon, DotIcon, KeyIcon } from 'lucide-react'
import clsx from 'clsx'
import { TPermissionForOption, TPermissionHandler } from './Post/types'
import { TCampaign } from '../types'
import { campaignIncludes } from '../hooks/Forms/useCampaignForm/useCampaignForm'
import { SmallFloatingBox } from './FloatingBox'
import LoadingWrapper from './LoadingWrapper'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

type TProps = {
  handler: TPermissionHandler
}
const UserPermissionsSelector = ({ handler }: TProps) => {

  const { campaign, view: refreshCampaign } = useCurrentCampaign()

  const [loading, setLoading] = useState(false)

  const handleOnChange = (options: TPermissionForOption[]) => {
    setLoading(true)
    handler.handleOnPermissionSelected(options)
      .then(async () => {
        await refreshCampaign((campaign as TCampaign).id, { include: campaignIncludes }) // only until broadcasting is implemented
        setLoading(false)
      })
  }

  return (

    <Listbox value={handler.values} by="id" onChange={handleOnChange} multiple>
      <div className={'relative'}>
        <ListboxButton className="outline-none">
          <SmallFloatingBox hover>
            <KeyIcon className="stroke-stone-400 h-5 w-5"/>
          </SmallFloatingBox>
        </ListboxButton>

        <ListboxOptions className={clsx([
          'absolute bottom-full right-0 z-10 overflow-clip',
          'w-72 mb-4',
          'outline-none',
          'border border-stone-600 rounded-xl',
          'bg-stone-900 text-stone-200',
          'font-serif text-serif-md antialiased'
        ])}>
          <LoadingWrapper loading={loading} positioning={'absolute'}>
            <div className={'p-3'}>
              {handler.options.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  as={Fragment}
                  disabled={option.disabled}
                >
                  {({ focus, selected, disabled }) => (
                    <li className={`py-1 flex justify-between ${disabled ? 'text-stone-500' : 'cursor-pointer'}`}>
                      {option.name}
                      {(selected || disabled) && <CheckIcon className="text-stone-300 h-5 w-5"/>}
                      {!(selected || disabled) && focus && <DotIcon className="text-stone-300 h-5 w-5"/>}
                      {!(selected || disabled) && !focus && <div className="h-5 w-5"/>}
                    </li>
                  )}
                </ListboxOption>
              ))}
            </div>
          </LoadingWrapper>
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default UserPermissionsSelector