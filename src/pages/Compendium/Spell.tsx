import React, { FunctionComponent, JSX } from 'react'
import { storeSpell, TSpellRequest, updateSpell, viewSpell } from '../../services/SpellService'
import {
  clearSpellData,
  setSpellData,
  updateSpellData
} from '../../reducers/compendium/spell/spellSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TSpell } from '../../types'

const Spell: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, spellId } = useParams() as { compendiumId: string; spellId: string } // router

  const { spell } = useAppSelector((state: RootState) => state.spell) // redux

  const navigate = useNavigate()

  const isNew: boolean = spellId === 'new'

  const readyDataForRequest = (data: any): TSpellRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TSpell> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeSpell(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'spells', data: data.data }))
          navigate(`/compendia/${compendiumId}/spells/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateSpell(spellId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'spells', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={spellId}
      isNew={isNew}
      remoteData={spell as TSpell}
      onSave={submit}
      onFetch={() => viewSpell(spellId, { include: 'compendium' }).then(({ data }) => data.data)}
      fields={[]}
      ready={true}
      resetData={() => dispatch(clearSpellData(undefined))}
      setRemoteData={(data) => dispatch(updateSpellData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Spell
