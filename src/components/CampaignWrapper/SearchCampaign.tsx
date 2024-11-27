import { SearchIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/Forms/Fields/Button'
import * as React from 'react'
import SearchDialog from '@/components/SearchDialog'
import { useNavigate } from 'react-router-dom'

const SearchCampaign = () => {

  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false)

  const handleOnSelect = useCallback((link: string) => {
    navigate(link)
    setOpenSearchDialog(false)
  }, [navigate])

  return <>
    <Button onClick={() => setOpenSearchDialog(true)} variant={'ghost'}
            size={'small_icon'}>
      <SearchIcon  className={'w-5 h-5'}/>
      <SearchDialog isOpen={openSearchDialog} setIsOpen={setOpenSearchDialog} onSelect={handleOnSelect}/>
    </Button>
  </>
}

export default SearchCampaign