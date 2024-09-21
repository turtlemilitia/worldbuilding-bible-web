import { TLocation } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useLocationForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  locationId: TLocation['slug'];
  onCreated?: (data: TLocation) => any
  onUpdated?: (data: TLocation) => any
  onDeleted?: (id: string|number) => any
}
const LocationDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  locationId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useLocationForm({
    locationId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(locationId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Location'}
      form={form}
    />
  )
}

export default LocationDialog
