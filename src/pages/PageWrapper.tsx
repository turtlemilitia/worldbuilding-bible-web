import React, { JSX } from 'react'
import bgImage from '../assets/images/darkAlley1.png'
import Nav from '../components/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import AuthProvider from '../providers/AuthProvider'

const PageWrapper = (): JSX.Element => {
  return (
    <AuthProvider>
      <div className="min-h-screen font-sans-serif">
        <div className="-z-10 fixed w-full h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage})` }}/>
        <Nav/>
        <Outlet/>
        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default PageWrapper