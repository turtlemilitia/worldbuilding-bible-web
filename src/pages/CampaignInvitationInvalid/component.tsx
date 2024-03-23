import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Forms/Fields/Button'
import bgImage from '../../assets/images/kindori.webp'

const CampaignInvitationInvalid: FunctionComponent = () => {

  const navigate = useNavigate()

  return (
    <div
      className={`relative bg-cover bg-no-repeat bg-center`}
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={`bg-stone-950/50 md:h-screen flex items-center justify-center`}>
        <div className="w-full md:w-2/4 max-w-2xl text-center py-6 mt-6">
          <div className="w-full relative z-10">
            <h1 className="w-full uppercase font-sans-serif tracking-widest text-stone-100 text-6xl text-center">Invalid</h1>
            <h2 className="mt-6 font-display text-stone-400">
              This invitation has expired or is invalid. Please contact the Game Master for a new invitation.
            </h2>
            <div className="mt-6">
              <Button type="button" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default CampaignInvitationInvalid