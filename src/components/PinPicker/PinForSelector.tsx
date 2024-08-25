import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React, { Fragment, useMemo, useState } from 'react'
import { SmallFloatingBox } from '../FloatingBox'
import { CheckIcon, DotIcon, PinIcon } from 'lucide-react'
import { TSelectOption } from '../Forms/Fields/FieldMapper'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import clsx from 'clsx'
import { TPinForOption, TPinHandler } from '../Post/types'
import LoadingWrapper from '../LoadingWrapper'
import { campaignIncludes } from '../../hooks/Forms/useCampaignForm/useCampaignForm'
import { TCampaign } from '../../types'

type TProps = {
  pinHandler: TPinHandler
}
const PinForSelector = ({ pinHandler }: TProps) => {

  const { campaign, view: refreshCampaign } = useCampaignDataManager()

  const [loading, setLoading] = useState(false)

  const handleOnChange = (options: (TSelectOption & { type: 'user' | 'campaign' })[]) => {
    setLoading(true)
    pinHandler.handleOnPinSelected(options)
     .then(async () => {
       await refreshCampaign((campaign as TCampaign).slug, {include: campaignIncludes}) // only until broadcasting is implemented
       setLoading(false)
     })
  }

  const options: TPinForOption[] = useMemo(() => {
    if (!campaign) {
      return []
    }
    const users: TPinForOption[] = campaign.users.map((user) => ({
      id: user.id,
      name: user.name,
      type: 'user',
      disabled: pinHandler.values.some(value => value.type === 'campaign')
    })) ?? []
    return [
      {
        id: campaign.id,
        name: campaign.name,
        type: 'campaign'
      },
      ...users
    ]
  }, [campaign, pinHandler.values])

  return (

    <Listbox value={pinHandler.values} by="id" onChange={handleOnChange} multiple>
      <div className={'relative'}>
        <ListboxButton className="outline-none">
          <SmallFloatingBox hover>
            <PinIcon className="stroke-stone-400 h-5 w-5"/>
          </SmallFloatingBox>
        </ListboxButton>

        <ListboxOptions className={clsx([
          'absolute bottom-full right-0 z-10',
          'w-72 mb-4 p-3',
          'outline-none',
          'border border-stone-600 rounded-xl',
          'bg-stone-800 text-stone-200',
          'font-serif text-serif-md antialiased'
        ])}>
          <LoadingWrapper loading={loading} positioning={'absolute'}>
            {options.map((option) => (
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
          </LoadingWrapper>
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default PinForSelector