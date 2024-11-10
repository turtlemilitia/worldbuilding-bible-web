import React, { useState } from 'react'
import { Button } from '@/components/Forms/Fields/Button'
import { PinIcon } from 'lucide-react'

const useFilterByPinned = () => {

  const [pinnedOnly, setPinnedOnly] = useState<boolean>(false)

  const PinnedOnlyButton = () => (
    <Button
      size={'icon'}
      variant={pinnedOnly ? 'primary' : 'ghost'}
      className={'block text-stone-300 text-center content-center'}
      onClick={() => setPinnedOnly(prevState => !prevState)}
    >
      <PinIcon size={20} className="inline-block"/>
    </Button>
  )

  return { pinnedOnly, PinnedOnlyButton }
}

export default useFilterByPinned;