import { JSX } from 'react'
import { Outlet } from 'react-router-dom'

const SystemsWrapper = (): JSX.Element => {
  return (
    <>
      {/* TODO: put floating sidebars here */}
      <Outlet/>
    </>
  )
}

export default SystemsWrapper