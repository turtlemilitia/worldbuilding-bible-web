import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import bgImage from '@/assets/images/quests.png'
import L, { CRS, LatLng, LatLngBounds } from 'leaflet'
import { PinIcon } from 'lucide-react'
import { useState } from 'react'

export default function Map () {

  const data = {
    image: {
      url: bgImage,
      width: 1792,
      height: 1024
    },
    markers: [
      {
        position: new LatLng(50, 50, 0),
        name: 'A pretty CSS3 popup. Easily customizable.',
      },
    ],
  }
  const maxBounds = new LatLngBounds([0, data.image.width/4], [data.image.height/4, 0])
  const bounds = new LatLngBounds([0, data.image.width/4], [data.image.height/4, 0])

  return <MapContainer center={[0, 0]} zoom={1} maxBounds={maxBounds}
                       className={'relative rounded-3xl h-[500px] w-full overflow-hidden border border-stone-500 my-5'}
                       crs={L.CRS.Simple}>

    {data.markers.map((marker, i) => {
      return <Marker key={i} position={marker.position}>
        <Popup>{marker.name}</Popup>
      </Marker>
    })}
    <ImageOverlay url={data.image.url} bounds={bounds}/>
  </MapContainer>
}