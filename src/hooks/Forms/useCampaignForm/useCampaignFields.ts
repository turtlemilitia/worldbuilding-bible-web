import { selectField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'

const useCampaignFields = (): TUseFields => {

  const { data: compendia } = useAppSelector((state: RootState) => state.compendia) // redux

  const fields: TField[] = [
    selectField({
      name: 'compendium',
      label: 'Compendium',
      options: compendia
    })
  ]

  return { fields, ready: true }
}

export default useCampaignFields
