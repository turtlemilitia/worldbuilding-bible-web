import { selectField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useCompendiumIndexDataManager, useNotebookIndexDataManager } from '../../DataManagers'
import {Button} from "@headlessui/react";
import CampaignService from "../../../services/ApiService/Campaigns/CampaignService";

const useCampaignFields = (campaignId: string): TUseFields => {

  const { compendia } = useCompendiumIndexDataManager()
  const {notebooks} = useNotebookIndexDataManager()

  const fields: TField[] = [
    selectField({
      name: 'compendium',
      label: 'Compendium',
      options: compendia ?? []
    })
  ]

  if (notebooks && notebooks.length > 0) {
    fields.push(
      selectField({
        name: 'notebook',
        label: 'Notebook',
        options: notebooks,
      })
    )
  }

  if (campaignId) {
    fields.push({
      label: "Download",
      name: "",
      type: 'callback',
      Callback: () => {
        return <Button onClick={() => CampaignService.downloadSummary(campaignId)}>
          Download Model Data
        </Button>
      }
    })
  }

  return { fields, ready: true }
}

export default useCampaignFields
