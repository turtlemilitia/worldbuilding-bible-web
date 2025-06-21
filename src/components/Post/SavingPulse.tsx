import React from 'react'

type TProps = {
  saving: boolean;
}

export function SavingPulse ({ saving }: TProps) {
  if (!saving) {
    return <></>
  }
  return <div
    className={'absolute top-5 right-5 bg-yellow-300 h-3 w-3 rounded-full animate-pulse'}/>
}