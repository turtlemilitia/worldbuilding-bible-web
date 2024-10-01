import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useCompendiumIndexDataManager, useNoteIndexDataManager, } from '../../DataManagers'
import CampaignService from "../../../services/ApiService/Campaigns/CampaignService";
import {Button} from '@/components/Forms/Fields/Button';

const useCampaignFields = (campaignId: string): TUseFields => {

  const { compendia } = useCompendiumIndexDataManager()
  const {notes} = useNoteIndexDataManager()

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

  if (campaignId) {
    fields.push({
      label: "Download",
      name: "",
      type: 'callback',
      Callback: () => {
        return <Button onClick={() => CampaignService.downloadSummary(campaignId)} className={'w-full'}>
          Download Campaign Data
        </Button>
      }
    })
  }

  return { fields }
}

export default useCampaignFields
