import React, { JSX, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updateData } from '../../reducers/system/systemSlice'
import { Save } from 'lucide-react'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
import HeaderWrapper from '../../components/HeaderWrapper'
import ContentWrapper from '../../components/ContentWrapper'
import { storeSystem, updateSystem, viewSystem } from '../../services/SystemService'
import { TSystem } from '../../types'
import { AxiosError } from 'axios'

const System = (): JSX.Element => {

  const remote = useAppSelector((state: RootState) => state.system) // redux

  const dispatch = useAppDispatch() // redux

  const { slug } = useParams() as { slug: string } // router

  const [data, setData] = useState<TSystem>({
    name: '',
    description: ''
  })

  const [error, setError] = useState<string>()

  const isNew: boolean = slug === 'new'

  useEffect(() => {
    if (slug && !isNew) {
      viewSystem(slug)
        .then(response => {
          dispatch(updateData(response.data.data))
          setData(response.data.data)
        })
        .catch(err => {
          setError(err)
        })
    }
  }, [slug])

  const submit = (event: React.SyntheticEvent) => {
    ((isNew) ? storeSystem(data) : updateSystem(slug, data))
      .then(response => {
        setData(response.data.data)
      })
      .catch((err: AxiosError) => {
        setError(err.message)
      })
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit={submit}>
        <HeaderWrapper>
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: TSystem) => ({ ...prevState, name: value }))}
                           placeholder={'System Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper errorText={error}>
          <div className="flex justify-end px-3 py-2">
            <button type="submit">
              <Save className="stroke-stone-700 h-5 w-5"/>
            </button>
          </div>
          <DiscreetTextareaField
            value={data.description}
            onChange={(value) => setData((prevState: TSystem) => ({ ...prevState, description: value }))}
            placeholder={'Write a simple description for the system.'}
          />
        </ContentWrapper>
      </form>
    </>
  )
}

export default System