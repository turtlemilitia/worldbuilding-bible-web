import { JSX, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useAppSelector } from '../../hooks'

const System = (): JSX.Element => {

  const { id } = useParams()

  const isNew = id === 'new'

  const system = useAppSelector((state: RootState) => state.system)

  useEffect(() => {
    if (!isNew) {

    }
  }, [id])

  return (
    <>
      {}
    </>
  )
}

export default System