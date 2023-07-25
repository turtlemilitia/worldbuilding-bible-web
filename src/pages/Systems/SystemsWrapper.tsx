import { JSX } from 'react'
import { Outlet } from 'react-router-dom'

const SystemsWrapper = (): JSX.Element => {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default SystemsWrapper