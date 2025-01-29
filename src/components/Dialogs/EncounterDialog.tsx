import { TEncounter } from '../../types'
import React, { FunctionComponent, useEffect } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useEncounterForm } from '../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  encounterId: string | number;
  onCreated?: (data: TEncounter) => any
  onUpdated?: (data: TEncounter) => any
  onDeleted?: (id: string|number) => any
}
const EncounterDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  encounterId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const { campaign } = useCurrentCampaign();

  useEffect(() => {
    console.log({ campaign, encounterId })
  }, [campaign, encounterId])

  const form = useEncounterForm({
    campaignId: campaign?.id,
    encounterId: fixId(encounterId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(encounterId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Encounter'}
      form={form}
    />
  )
}

export default EncounterDialog
