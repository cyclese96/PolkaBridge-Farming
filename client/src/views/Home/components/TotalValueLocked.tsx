import BigNumber from 'bignumber.js'
import React, { memo, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import usePBRPrice from '../../../hooks/usePBRPrice'
import Web3 from 'web3'

const TotalValueLocked = memo(() => {
  const stakedValue = useAllStakedValue()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)
  const pbrPrice = usePBRPrice()
  
  let totalLocked = 0
  for (let e of stakedValue) {
    //console.log(e.pid,parseFloat(Web3.utils.fromWei(e.usdValue.toFixed(0).toString(),'ether')))
    
    totalLocked += (parseFloat(Web3.utils.fromWei(e.usdValue.toFixed(0).toString(),'ether')))
  }

  useEffect(() => {
    setStart(end)
    setEnd(totalLocked)
  }, [totalLocked])

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
        decimals={end < 0 ? 1 : end > 1e5 ? 0 : 1}
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

export default TotalValueLocked
