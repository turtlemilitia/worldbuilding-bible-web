import { TUseForm, TUseFormProps } from '../../components/Post/types'
import {TCompendium} from "../../types";
import useFormHandling from "../useFormHandling";
import {
  destroyCompendium,
  storeCompendium,
  TCompendiumRequest,
  updateCompendium,
  viewCompendium
} from "../../services/CompendiumService";
import {useParams} from "react-router-dom";

const useCompendiumForm = ({
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TUseFormProps<TCompendium>): TUseForm<TCompendium> => {

  // route
  const {compendiumId} = useParams() as { compendiumId: string } // router

  const include = 'characters;concepts;currencies;deities;factions;items;languages;locations;naturalResources;pantheons;planes;religions;species;spells;stories'

  const mapData = (data: TCompendiumRequest): TCompendiumRequest => ({
    name: data.name,
    content: data.content
  })

  const onFetch = () => viewCompendium(compendiumId, {include}).then(({data}) => data.data)

  const onCreate = (data: TCompendiumRequest) => storeCompendium(mapData(data)).then(({data}) => data.data)

  const onUpdate = (data: TCompendiumRequest) => updateCompendium(compendiumId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyCompendium(compendiumId)

  return useFormHandling({
    isNew,
    mapData,

    // API
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
    onCreated,
    onDeleted,

    // persisted data
    persistedData,
    setPersistedData,
    updatePersistedData,
    resetPersistedData: () => {}
  });
}

export default useCompendiumForm;
