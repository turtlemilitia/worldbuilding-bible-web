import {TUseForm} from "../../components/Post/types";
import {TCompendium} from "../../types";
import useFormHandling from "../useFormHandling";
import {
  destroyCompendium,
  storeCompendium,
  TCompendiumRequest,
  updateCompendium,
  viewCompendium
} from "../../services/CompendiumService";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks";
import {RootState} from "../../store";
import {addCompendium} from "../../reducers/compendium/compendiaIndexSlice";
import {setCompendiumData, updateCompendiumData} from "../../reducers/compendium/compendiumSlice";

const useCompendiumForm = ({isNew}: { isNew: boolean }): TUseForm<TCompendium> => {

  // redux
  const dispatch = useDispatch();

  // route
  const {compendiumId} = useParams() as { compendiumId: string } // router
  const navigate = useNavigate();

  // compendium state
  const {compendium: persistedData} = useAppSelector((state: RootState) => state.compendium) // redux

  const include = 'characters;concepts;currencies;deities;factions;items;languages;locations;naturalResources;pantheons;planes;religions;species;spells;stories'

  const readyDataForRequest = (data: TCompendiumRequest): TCompendiumRequest => ({
    name: data.name,
    content: data.content
  })

  const handleFetch = () => viewCompendium(compendiumId, {include}).then(({data}) => data.data)

  const handleCreate = (data: TCompendiumRequest) => storeCompendium(readyDataForRequest(data)).then(({data}) => data.data)

  const handleUpdate = (data: TCompendiumRequest) => updateCompendium(compendiumId, readyDataForRequest(data)).then(({data}) => data.data)

  const handleDelete = () => destroyCompendium(compendiumId)

  const handleSetPersistedData = (data?: TCompendium) => dispatch(setCompendiumData(data));

  const handleUpdatePersistedData = (data: Partial<TCompendium>) => dispatch(updateCompendiumData(data));

  const {
    errors,
    newData,
    fetchedData,
    updateAllData,
    loading,
    saving,
    handleOnFieldChange,
    handleOnFetch,
    handleOnSave,
    handleOnDelete,
  } = useFormHandling({
    isNew,
    mapData: readyDataForRequest,

    // API
    onFetch: handleFetch,
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
    onCreated: (data) => {
      dispatch(addCompendium(data))
      navigate(`/compendia/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/`)
    },

    // persisted data
    persistedData,
    setPersistedData: handleSetPersistedData,
    updatePersistedData: handleUpdatePersistedData,
    resetPersistedData: () => {}
  });

  return {
    persistedData,
    newData,
    fetchedData,

    errors,
    updatePersistedData: handleUpdatePersistedData,
    updateAllData,
    loading,
    saving,

    handleOnSave,
    handleOnFetch,
    handleOnDelete,
    handleOnFieldChange
  };
}

export default useCompendiumForm;
