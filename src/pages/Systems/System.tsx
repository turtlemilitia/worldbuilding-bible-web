import { JSX } from 'react'
import { useParams } from 'react-router-dom'

const System = (): JSX.Element => {

  const { id } = useParams()

  const isNew = id === 'new'

  return (
    <>
      This is a {id} page bitch
    </>
  )
}

export default System