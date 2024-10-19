import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useCompendiumIndexDataManager, useNoteIndexDataManager, } from '../../DataManagers'
import CampaignService from "../../../services/ApiService/Campaigns/CampaignService";
import {Button} from '@/components/Forms/Fields/Button';
import { useCampaignDataManager } from '@/hooks/DataManagers'
import { useMemo } from 'react'
import useAuthUserDataManager from '@/hooks/DataManagers/useAuthUserDataManager'

const useCampaignFields = (campaignId: string): TUseFields => {

  const { user } = useAuthUserDataManager()
  const { campaign, createInvitation } = useCampaignDataManager()
  const { compendia } = useCompendiumIndexDataManager()
  const { notes}  = useNoteIndexDataManager()

  const isGamemaster = useMemo(() => {
    return campaign && user && user.id === campaign.gameMaster?.id
  }, [campaign, user])

  const fields = useMemo(() => {

    const fields: TField[] = [
      selectField({
        name: 'compendium',
        label: 'Compendium',
        options: compendia ?? []
      })
    ]

    if (notes) {
      fields.push(
        noteField({
          options: notes,
        })
      )
    }

    if (campaign && isGamemaster) {
      fields.push({
        name: 'invitations',
        label: 'Invite a new player',
        type: 'listAddUsers',
        users: campaign.users,
        onSubmit: (email) => createInvitation(campaign.slug, email)
      });
    }

    if (campaignId) {
      fields.push({
        label: "Download",
        name: "",
        type: 'callback',
        Callback: () => {
          return <Button
            onClick={() => CampaignService.downloadSummary(campaignId)}
            className={'w-full'}>
            Download Campaign Data
          </Button>
        }
      })
    }
    return fields
  }, [campaignId, isGamemaster, compendia, notes, campaign, createInvitation])

  return { fields }
}

export default useCampaignFields
