import React, { FunctionComponent, JSX, useEffect, useState } from 'react'

interface TProps {
  loading: boolean;
  onChange: (key: string, value: any) => void
}

const LocationInfoBar: FunctionComponent<TProps> = ({ loading, onChange }: TProps): JSX.Element => {

  const fields = [
    {
      name: 'aliases',
      label: 'Aliases',
      type: 'select'
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select'
    },
  ]

  return (
    <div className={`relative z-10 translate-x-full`}>
      <div className={`absolute transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'} ml-10`}>
        <ul
          className="rounded-3xl bg-stone-900 border border-stone-700 w-80 py-6 px-8 text-stone-300">
          {fields.map(field => {
            return (
              <li className="flex">
                <span className="text-stone-400 w-1/4">{field.label}:</span><span className="pl-3 w-3/4">When</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default LocationInfoBar