import React, { FunctionComponent, JSX } from 'react'
import RippedPaperEffect from '../assets/images/RippedPaperEffect'
import { Button } from '@/components/Forms/Fields/Button'
import bgImage from '../assets/images/city-noir.png'
import { FloatingBox } from '../components/FloatingBox'

const Home: FunctionComponent = (): JSX.Element => {

  return (
    <div className="antialiased">
      <div className="bg-cover bg-center"
           style={{ backgroundImage: `url(${bgImage})` }}>
        <div
          className="h-underScreen p-5 flex items-center justify-center text-center bg-stone-800 bg-opacity-50 shadow-sm shadow-stone-800 backdrop-blur-sm">
          <div className="max-w-3xl text-stone-100">
            <h1 className="font-display text-6xl mb-7">Worldbuilding Tome</h1>
            <p className="font-sans-serif uppercase my-3">Unleash your creativity</p>
            <p className="my-3">Create and Craft Your Perfect Literary World</p>
            <p className="my-3">Are you a Dungeon Master, an aspiring novelist, or just a lover of epic tales?</p>
            <p>Worldbuilding Tome is your ultimate companion for crafting immersive worlds, characters, and adventures
              in the realm of Dungeons & Dragons.</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-8 left-0 right-0 w-full h-8 overflow-hidden">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
        <div className="relative h-underScreen bg-stone-200 p-5 flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl mb-7">Join the Journey</h1>
            <p className="my-3">Embark on a journey of endless possibilities. Craft intricate realms, breathe life into
              characters, and forge legends that will resonate for ages. Begin your adventure with Worldbuilding Tome
              today.</p>
            <div className="my-3">
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-8 rotate-180 left-0 right-0 w-full h-8 overflow-hidden">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
      </div>
      <div className="h-underScreen p-5 flex items-center justify-center text-center"
           style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="max-w-2xl">
          <FloatingBox>
            <h1 className="font-display text-5xl mb-7">Features</h1>
            <ul>
              <li className="my-6">
                <h2 className="font-sans-serif uppercase tracking-widest">Compendiums</h2>
                Build your universe with rich details. Create captivating locations,
                unique characters, and intricate stories.
              </li>
              <li className="my-6">
                <h2 className="font-sans-serif uppercase tracking-widest">Campaigns</h2>
                Plan epic quests, map out thrilling adventures, and bring your campaigns
                to life.
              </li>
              <li className="my-6">
                <h2 className="font-sans-serif uppercase tracking-widest">Notes & Scrapbooks</h2>
                Capture your musings, jot down ideas, and organize your
                creativity with ease.
              </li>
              <li className="my-6">
                <h2 className="font-sans-serif uppercase tracking-widest">Immerse Yourself</h2>
                Dive into an intuitive interface designed to spark your imagination
                and streamline your storytelling.
              </li>
              <li className="my-6">
                <h2 className="font-sans-serif uppercase tracking-widest">For Players & Masters</h2>
                Whether you're a player seeking character depth or a master
                weaving worlds, Worldbuilding Tome has something for you.
              </li>
            </ul>
          </FloatingBox>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-8 left-0 right-0 w-full h-8 overflow-hidden">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
        <div className="relative h-underScreen bg-stone-200 p-5 flex items-center justify-center text-center">
          <div className="md:w-3/4">
            <h1 className="font-display text-5xl mb-7">Why Choose Worldbuilding Tome?</h1>
            <ul>
              <li className="my-3">
                🌟 Unleash Creativity: Seamlessly create, modify, and organize every facet of your fantasy world.
              </li>
              <li className="my-3">
                🎉 Engage Players: Craft gripping narratives and immersive adventures that captivate your players'
                imaginations.
              </li>
              <li className="my-3">
                📈 Streamline Workflow: Our intuitive design and user-friendly features empower you to spend more time on
                storytelling and less on organization.
              </li>
              <li className="my-3">
                📱 Anytime, Anywhere: Access your world-building toolkit on any device, at any time.
              </li>
              <li className="my-3">
                👥 Join the Community: Connect with like-minded creators and share your worlds with the Worldbuilding
                Tome
                community.
              </li>
            </ul>
            <div className="my-5">
              <Button>Start your adventure today</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home