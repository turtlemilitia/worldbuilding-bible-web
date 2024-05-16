import useFields, { TField } from '../useFields'
import { TCampaign, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  campaign?: TCampaign,
}

const useCampaignFields = ({}: TProps): TUseFields => {

  const fields: TField[] = []

  return { fields, ready: true }
}

export default useCampaignFields
