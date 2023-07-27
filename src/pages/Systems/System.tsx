import { JSX, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { SystemState } from '../../reducers/system/systemSlice'
import { Save } from 'lucide-react'
import SpyTextField from '../../components/Forms/SpyFields/SpyTextField'
import SpyH1Field from '../../components/Forms/SpyFields/SpyH1Field'
import SpyTextareaField from '../../components/Forms/SpyFields/SpyTextareaField'
import HeaderWrapper from '../../components/HeaderWrapper'

const System = (): JSX.Element => {

  const remote = useAppSelector((state: RootState) => state.system) // redux

  const dispatch = useAppDispatch() // redux

  const { id } = useParams() // router

  const [data, setData] = useState<SystemState>({
    name: 'New System',
    description: ''
  })

  const isNew = id === 'new'

  useEffect(() => {
    if (!isNew) {
      // todo fetch system and commit
    }
  }, [id, isNew])

  return (
    <>
      <HeaderWrapper>
        <SpyH1Field
          value={data.name}
          className="text-center"
          onChange={(value) => setData((prevState: SystemState) => ({ ...prevState, name: value }))}/>
      </HeaderWrapper>
      <div className="relative w-full bg-stone-300 pt-10 flex justify-center">
        <div className="max-w-5xl">
          <div className="flex justify-end">
            <Save className="stroke-stone-700"/>
          </div>
          <SpyTextareaField value={data.description} onChange={(value) => setData((prevState: SystemState) => ({
            ...prevState,
            description: value
          }))}/>
        </div>
      </div>
    </>
  )
}

export default System