import React, { useState } from 'react'
import { Button } from '@/components/Forms/Fields/Button'
import { KeyIcon } from 'lucide-react'

const useFilterByPinned = () => {

  const [publicOnly, setPublicOnly] = useState<boolean>(false)

  const PublicOnlyButton = () => (
    <Button
      size={'icon'}
      variant={publicOnly ? 'primary' : 'ghost'}
      className={'block text-stone-300 text-center content-center'}
      onClick={() => setPublicOnly(prevState => !prevState)}
    >
      <KeyIcon className="h-5 w-5 inline-block"/>
    </Button>
  )

  return { publicOnly, PublicOnlyButton }
}

export default useFilterByPinned;