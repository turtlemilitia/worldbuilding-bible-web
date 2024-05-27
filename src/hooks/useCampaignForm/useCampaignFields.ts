import useFields, { TField } from '../useFields'
import { TCampaign, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

type TProps = {
  campaign?: TCampaign,
}

const useCampaignFields = ({}: TProps): TUseFields => {

  const { compendia } = useAppSelector((state: RootState) => state.compendia) // redux

  const {selectField} = useFields();
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
