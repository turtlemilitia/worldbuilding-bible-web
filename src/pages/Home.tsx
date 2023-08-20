import React, { FunctionComponent, JSX } from 'react'
import RippedPaperEffect from '../assets/images/RippedPaperEffect'
import PrimaryButton from '../components/Forms/Fields/PrimaryButton'
import bgImage from '../assets/images/city-noir.png'

const Home: FunctionComponent = (): JSX.Element => {

  return (
    <>
      <div className="bg-cover bg-center"
           style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="h-underScreen p-5 flex items-center justify-center text-center bg-stone-800 bg-opacity-50 shadow-sm shadow-stone-800 backdrop-blur-sm">
          <div className="md:w-3/4 text-stone-100">
            <h1 className="font-display text-5xl mb-7">Welcome to [Your App Name]</h1>
            <p className="my-3">Unleash Your Creativity in the World of Dungeons & Dragons</p>
            <p className="my-3">Create and Craft Your Perfect Fantasy World</p>
            <p className="my-3">Are you a Dungeon Master, an aspiring novelist, or just a lover of epic tales? Look no
              further. [Your App Name] is your ultimate companion for crafting immersive worlds, characters, and
              adventures in the realm of Dungeons & Dragons.</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-8 left-0 right-0 w-full h-8 overflow-hidden">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
        <div className="relative h-underScreen bg-stone-200 p-5 flex items-center justify-center text-center">
          <div className="md:w-3/4">
            <h1 className="font-display text-5xl mb-7">Join the Journey</h1>
            <p className="my-3">Embark on a journey of endless possibilities. Craft intricate realms, breathe life into
              characters, and forge legends that will resonate for ages. Begin your adventure with [Your App Name]
              today.</p>
            <div className="my-3">
              <PrimaryButton text="Get Started"/>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-8 rotate-180 left-0 right-0 w-full h-8 overflow-hidden">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
      </div>
      <div className="h-underScreen p-5 flex items-center justify-center text-center"
           style={{ backgroundImage: `url(${bgImage})` }}>
        <div
          className="md:w-3/4 py-10 px-5 bg-stone-700 bg-opacity-50 border border-yellow-500 shadow-sm shadow-stone-800 backdrop-blur-lg text-stone-100">
          <h1 className="font-display text-5xl mb-7">Features</h1>
          <ul>
            <li className="my-3">
              📖 Compendiums: Build your universe with rich details. Create captivating locations,
              unique characters, and intricate stories.
            </li>
            <li className="my-3">
              🎭 Campaigns: Plan epic quests, map out thrilling adventures, and bring your campaigns
              to life.
            </li>
            <li className="my-3">
              🗒️ Notes & Scrapbooks: Capture your musings, jot down ideas, and organize your
              creativity with ease.
            </li>
            <li className="my-3">
              📚 Reference Library: Access a treasure trove of resources, from spells and monsters to
              lore and legends.
            </li>
            <li className="my-3">
              🎨 Immerse Yourself: Dive into an intuitive interface designed to spark your imagination
              and streamline your storytelling.
            </li>
            <li className="my-3">
              🌌 For Players & Masters: Whether you're a player seeking character depth or a master
              weaving worlds, [Your App Name] has something for you.
            </li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-8 left-0 right-0 w-full h-8 overflow-hidden">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
        <div className="relative h-underScreen bg-stone-200 p-5 flex items-center justify-center text-center">
          <div className="md:w-3/4">
            <h1 className="font-display text-5xl mb-7">Why Choose [Your App Name]?</h1>
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
                👥 Join the Community: Connect with like-minded creators and share your worlds with the [Your App Name]
                community.
              </li>
            </ul>
            <div className="my-5">
              <PrimaryButton text="Start your adventure today"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Home