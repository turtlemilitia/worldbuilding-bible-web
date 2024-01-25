import React, { FunctionComponent, JSX } from 'react'
import { destroySpell, storeSpell, TSpellRequest, updateSpell, viewSpell } from '../../services/SpellService'
import {
  clearSpellData,
  setSpellData,
  updateSpellData
} from '../../reducers/compendium/spell/spellSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TSpell } from '../../types'

const Spell: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, spellId } = useParams() as { compendiumId: string; spellId: string } // router

  const { spell } = useAppSelector((state: RootState) => state.spell) // redux

  const readyDataForRequest = (data: any): TSpellRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={spellId}
      isNew={spellId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/spells/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewSpell(spellId).then(({ data }) => data.data)}
      onCreate={(data: TSpellRequest) => storeSpell(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TSpellRequest) => updateSpell(spellId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroySpell(spellId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'spells', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'spells', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'spells', id: spellId }))
      }}

      fields={[]}

      persistedData={spell as TSpell}
      setPersistedData={(data) => dispatch(setSpellData(data))}
      updatePersistedData={(data) => dispatch(updateSpellData(data))}
      resetPersistedData={() => dispatch(clearSpellData(undefined))}
    />
  )
}

export default Spell
