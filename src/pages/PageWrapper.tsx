import React, { JSX } from 'react'
import bgImage from '@/assets/images/darkAlley1.png'
import Nav from '../components/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import AuthProvider from '../providers/AuthProvider'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import { MusicPlayerProvider } from '@/pages/MusicPlayerProvider'

const PageWrapper = (): JSX.Element => {

  const { backgroundImage, defaultBackgroundImage } = usePostDataManager()

  return (
    <AuthProvider>
      <MusicPlayerProvider>
        <div className="fixed h-screen w-full font-sans-serif">
          <div className="-z-10 fixed w-full h-full bg-cover bg-no-repeat bg-center"
               style={{ backgroundImage: `url(${backgroundImage ?? defaultBackgroundImage ?? bgImage})` }}/>
          <div className="bg-stone-950/50 h-full">
            <Nav/>
            <Outlet/>
            <Footer/>
          </div>
        </div>
      </MusicPlayerProvider>
    </AuthProvider>
  )
}

export default PageWrapper