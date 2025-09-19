import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import { Dialog, DialogPanel, Input } from '@headlessui/react'
import { CheckIcon, XIcon, SearchIcon } from 'lucide-react'
import { FloatingBox } from '@/components/FloatingBox'

type TOwnProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onSubmit: (value: string) => void
  onOpenSearch: () => void
  initValue?: string
}

const IconButton: FunctionComponent<{
  onClick: () => void
  children: React.ReactNode
}> = ({ onClick, children }) => (
  <button onClick={onClick}>
    {children}
  </button>
)

const InputDialog: FunctionComponent<TOwnProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onOpenSearch,
  initValue,
}) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (initValue !== undefined ) {
      setInputValue(initValue)
    }
  }, [initValue])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleSubmit = useCallback(() => {
    onSubmit(inputValue)
  }, [onSubmit, inputValue])

  const handleSearch = useCallback(() => {
    onOpenSearch()
  }, [onOpenSearch])

  const canSubmit = inputValue.length > 0

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-10">
        <FloatingBox color="dark" size="sm"
                     className="w-full max-w-md bg-cover bg-center">
          <DialogPanel className="overflow-hidden flex gap-2">
            <Input
              placeholder="Enter link"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full h-full bg-transparent outline-none"
            />
            {canSubmit && (
              <IconButton onClick={handleSubmit}>
                <CheckIcon className="h-5 w-5 cursor-pointer"/>
              </IconButton>
            )}
            <IconButton onClick={handleClose}>
              <XIcon className="h-5 w-5 cursor-pointer"/>
            </IconButton>
            <IconButton onClick={handleSearch}>
              <SearchIcon className="h-5 w-5 cursor-pointer"/>
            </IconButton>
          </DialogPanel>
        </FloatingBox>
      </div>
    </Dialog>
  )
}

export default InputDialog