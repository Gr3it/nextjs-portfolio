import React from 'react'
import { Village } from './Village'
import { Forest } from './Forest'
import { Plains } from './Plains'
import { Badlands } from './Badlands'
import { Desert } from './Desert'
import { Ocean } from './Ocean'
import { Skylands } from './Skylands'
import { City } from './City'

export default function World() {
  return (
    <>
        <Village position={[0,0,0]}/>
        <Forest position={[0,0,32]}/>
        <Plains position={[0,0,142]}/>
        <Badlands position={[0,0,238]}/>
        <Desert position={[0,0,286]}/>
        <Ocean position={[0,0,334]}/>
        <Skylands position={[0,0,484]}/>
        <City position={[0,0,521]}/>
    </>
  )
}
