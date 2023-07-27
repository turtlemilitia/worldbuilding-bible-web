import { JSX, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { SystemState } from '../../reducers/system/systemSlice'
import { Save } from 'lucide-react'
import DiscreetH1Field from "../../components/Forms/SpyFields/DiscreetH1Field";
import DiscreetTextareaField from "../../components/Forms/SpyFields/DiscreetTextareaField";
import HeaderWrapper from '../../components/HeaderWrapper'

const System = (): JSX.Element => {

  const remote = useAppSelector((state: RootState) => state.system) // redux

  const dispatch = useAppDispatch() // redux

  const { id } = useParams() // router

  const [data, setData] = useState<SystemState>({
    name: '',
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
        <DiscreetH1Field value={data.name}
                         onChange={(value) => setData((prevState: SystemState) => ({...prevState, name: value}))}
                         placeholder={'System Name Here'}/>
      </HeaderWrapper>
      <div className="relative w-full bg-stone-300 pt-10 flex justify-center">
        <div className="max-w-5xl">
          <div className="flex justify-end">
            <Save className="stroke-stone-700 h-5 w-5"/>
          </div>
          <DiscreetTextareaField
            value={data.description}
            onChange={(value) => setData((prevState: SystemState) => ({...prevState, description: value}))}
            placeholder={'Write a simple description for the system.'}
          />
        </div>
      </div>
    </>
  )
}

export default System