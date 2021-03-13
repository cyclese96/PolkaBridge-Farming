import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import {
  getPBRPrice,
  getFarms
} from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'



export interface StakedValue {
  tokenAmount: BigNumber
  token2Amount: BigNumber
  totalToken2Value: BigNumber
  tokenPriceInToken2: BigNumber
  poolWeight: BigNumber
  usdValue: BigNumber
  pid: string,
  price: BigNumber
}


const usePBRPrice = () => {
  const [price, setPrice] = useState<BigNumber>(new BigNumber(0))
  const pbr = usePolkaBridge()
  const farms = getFarms(pbr)


  const fetchPBRPrice = useCallback(async () => {
    const price = await getPBRPrice(

      farms
    )

    setPrice(price)
  }, [pbr, price])

  useEffect(() => {
    const interval = setInterval(async () => {
      fetchPBRPrice()

    }, 60000)
    fetchPBRPrice()
    return () => clearInterval(interval)

  }, [pbr])

  return price
}

export default usePBRPrice
