import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import useSushi from './useSushi'
import axios from 'axios'
import config from '../config'
import { client } from '../apollo/client'

import {
  PAIR_DATA,
  PAIRS_BULK,
} from '../apollo/queries'

const useBulkPairData = (pairsList: [string]) => {
  const [pairs, setPairs] = useState([])
  const sushi = useSushi()

  const fetchPairs = useCallback(async () => {
    let current = await client.query({
      query: PAIRS_BULK,
      variables: {
        allPairs: pairsList,
      },
      fetchPolicy: 'cache-first',
    })

    let pairData = await Promise.all(
      current &&
        current.data.pairs.map(async (pair: any) => {
          return pair
        })
    )

    setPairs(pairData)
  }, [sushi])

  useEffect(() => {
    if (sushi) {
      fetchPairs()
    }
  }, [setPairs, sushi])

  return pairs
}

export default useBulkPairData
