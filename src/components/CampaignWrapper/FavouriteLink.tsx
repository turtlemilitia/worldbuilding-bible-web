import { FloatingBox } from '@/components/FloatingBox'
import SansSerifText from '@/components/SmallSansSerifText'
import React, { FunctionComponent, useState } from 'react'
import { TFloatingBoxProps } from '@/components/FloatingBox/FloatingBox'
import Dialog from '@/components/Dialogs'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import { TTypesAllowedString } from '@/types'
import { Button } from '@headlessui/react'

export type CampaignFavouriteLink = {
  entityId: number,
  slug: string,
  name: string,
  type: TTypesAllowedString
};
const FavouriteLink: FunctionComponent<CampaignFavouriteLink & TFloatingBoxProps> = ({entityId, name, type, ...props}) => {

  const [dialogIsOpen, setDialogIsOpen] = useState<number | false>(false)

  return (
    <div>
      <Button className={'inline'} onClick={() => setDialogIsOpen(entityId)}>
        <FloatingBox
          size={'sm'}
          className={`transition-all duration-1000 hover:bg-yellow-600`}
          {...props}
        >
          <SansSerifText className={'mx-2'}>{name}</SansSerifText>
        </FloatingBox>
      </Button>
      {dialogIsOpen && (
        <Dialog
          type={type as TDialogTypes}
          isOpen={!!dialogIsOpen}
          setIsOpen={() => setDialogIsOpen(false)}
          id={dialogIsOpen}
          onDeleted={/*todo*/() => {}}
        />
      )}
    </div>
  )
}

export default FavouriteLink