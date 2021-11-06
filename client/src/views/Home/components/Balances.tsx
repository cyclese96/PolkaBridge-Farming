import BigNumber from 'bignumber.js'
import React, { memo, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import PolkaBridgeIcon from '../../../components/PolkaBridgeIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'

import useTokenBalanceOf from '../../../hooks/useTokenBalanceOf'
import useTokenTotalSupply from '../../../hooks/useTokenTotalSupply'
import usePolkaBridge from '../../../hooks/usePolkaBridge'
import { getPolkaBridgeAddress } from '../../../pbr/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import PolkaBridge from '../../../assets/img/balance.png'
import PolkaBridges from '../../../assets/img/supply.png'
import useNewReward from '../../../hooks/useNewReward'
import { makeStyles } from '@material-ui/core/styles'
import Loader from './Loader'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  let allEarnings = useAllEarnings()

  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

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
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    height: 340,
    width: '100%',
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 42, 66, 0.3)",
    border: "1px solid #212121",
    filter: "drop-shadow(0 0 0.5rem #212121)",
   

    [theme.breakpoints.down("sm")]: {
      width:'100%',
      height: "100%",
      
    },
  },
  title: {
    textAlign: "center",
    fontSize: 22,
  },
  logoWrapper: {
    height: 45,
    width: 45,
    backgroundColor: "#ffffff",
    border: "1px solid #bdbdbd",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 30,
    width: 30,
  },
  tokenTitle: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: "#e5e5e5",
  },
  tokenSubtitle: {
    fontWeight: 300,
    padding: 0,
    paddingLeft: 10,
    fontSize: 12,
    color: "#bdbdbd",
  },
  tokenAmount: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 16,
    color: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Balances = memo(() => {
  const newReward = useNewReward()
  const pbr = usePolkaBridge()
  // const totalSupply = useTokenSupply(getPolkaBridgeAddress(pbr))
  let circulatingSupply = useTokenTotalSupply(getPolkaBridgeAddress(pbr))
  const lockedBalance = useTokenBalanceOf(
    getPolkaBridgeAddress(pbr),
    '0x6a97eedd28becb3590c19dead324e0fc203dd2a6',
  ).plus(
    useTokenBalanceOf(
      getPolkaBridgeAddress(pbr),
      '0x624b06b8452c9bdb8d558b591bf1b6825a133937',
    ),
  )
  const pbrBalance = useTokenBalance(getPolkaBridgeAddress(pbr))
  circulatingSupply = circulatingSupply.minus(lockedBalance)
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  const classes = useStyles()

  return (
    <StyledWrapper className="ml-3">
      <div className={classes.card}>
        <h6 className={classes.title} style={{ color: 'white' }}>
          Your Balance
        </h6>
        <div className="mt-4">
            <div className="d-flex justify-content-between mt-4">
              <div className="d-flex justify-content-start">
                <div className={classes.logoWrapper}>
                  <img src={"http://localhost:3000/img/symbol.png"} className={classes.logo} />
                </div>
                <div>
                  <div className={classes.tokenTitle}><div>
                <Label text="PBR" />
              </div></div>
                  <div className={classes.tokenSubtitle}>
                    PolkaBridge
                  </div>
                </div>
              </div>
              <div className={classes.tokenAmount}><Value
                value={!!account ? getBalanceNumber(pbrBalance) : 'Locked'}
                /></div>
            </div>
      </div>
      <div className="mt-4">
            <div className="d-flex justify-content-between mt-4">
              <div className="d-flex justify-content-start">
                <div className={classes.logoWrapper}>
                  <img src={"http://localhost:3000/img/symbol.png"} className={classes.logo} />
                </div>
                <div>
                  <div className={classes.tokenTitle}>PBR</div>
                  <div className={classes.tokenSubtitle}>
                   Supply
                  </div>
                </div>
              </div>
              <div className={classes.tokenAmount}>
              <Value
                value={circulatingSupply ? getBalanceNumber(circulatingSupply) : '~'}
              /></div>
            </div>
      </div>
      </div>
    </StyledWrapper>
  )
})

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

export default Balances
