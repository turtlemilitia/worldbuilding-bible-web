import React, { JSX } from 'react'
import bgImage from '../assets/images/ShadeImage.png'
import Nav from '../components/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import AuthProvider from '../providers/AuthProvider'

const PageWrapper = (): JSX.Element => {
  return (
    <AuthProvider>
      <div
        className="font-serif min-h-screen"
        >
        <div className="-z-10 fixed w-full h-full blur-sm bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage})` }}/>
        <Nav/>
        <Outlet/>
        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default PageWrapper