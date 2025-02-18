import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TCampaignDataManager,
  useCompendiumIndexDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import CampaignService from "../../../services/ApiService/Campaigns/CampaignService";
import {Button} from '@/components/Forms/Fields/Button';
import { useMemo } from 'react'
import useAuthUserDataManager from '@/hooks/DataManagers/useAuthUserDataManager'

const useCampaignFields = (manager: TCampaignDataManager): TUseFields => {

  const { user } = useAuthUserDataManager()
  const { campaign, createInvitation } = manager;
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
        onSubmit: (email) => createInvitation(email)
      });
    }

    if (campaign) {
      fields.push({
        label: "Download",
        name: "",
        type: 'callback',
        Callback: () => {
          return <Button
            onClick={() => CampaignService.downloadSummary(campaign.id)}
            className={'w-full'}>
            Download Campaign Data
          </Button>
        }
      })
    }
    return fields
  }, [isGamemaster, compendia, notes, campaign, createInvitation])

  return { fields }
}

export default useCampaignFields
