import BigNumber from 'bignumber.js'
import React, { memo, useEffect, useState } from 'react'
import CountUp from 'react-countup'

import usePBRPrice from '../../../hooks/usePBRPrice'

const TokenPrice = memo(() => {
  
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)
  const pbrPrice = usePBRPrice()

  const convertPrice = [pbrPrice]

  let finalPrice = 0
  for (let e of convertPrice) {
    finalPrice += (e as any)
  }
  useEffect(() => {
    setStart(start)
    setEnd(finalPrice)
  }, [finalPrice])


  

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.05)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    
    </span>
  )
})

export default TokenPrice
