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
import useTokenSupply from '../../../hooks/useTokenSupply'
import useTokenLocked from '../../../hooks/useTokenLocked'
import useTotalLocked from '../../../hooks/useTotalLocked'
import useTokenBalanceOf from '../../../hooks/useTokenBalanceOf'
import useTokenTotalSupply from '../../../hooks/useTokenTotalSupply'
import usePolkaBridge from '../../../hooks/usePolkaBridge'
import { getPolkaBridgeAddress } from '../../../pbr/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import PolkaBridge from '../../../assets/img/balance.png'
import PolkaBridges from '../../../assets/img/supply.png'
import useNewReward from '../../../hooks/useNewReward'

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

const Balances = memo(() => {
  const newReward = useNewReward()
  const pbr = usePolkaBridge()
  // const totalSupply = useTokenSupply(getPolkaBridgeAddress(pbr))
  let circulatingSupply = useTokenTotalSupply(getPolkaBridgeAddress(pbr))
  const lockedBalance = useTokenBalanceOf(getPolkaBridgeAddress(pbr), "0xf9d1c07fd1e7646a67d052d77461cc781b0a3f43")
  const pbrBalance = useTokenBalance(getPolkaBridgeAddress(pbr))
  circulatingSupply = circulatingSupply.minus(lockedBalance)
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              {/* <PolkaBridgeIcon /> */}
              <img src={PolkaBridge} height="50" alt="PBR Balance"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your Available PBR Balance" />
                <Value
                  value={!!account ? getBalanceNumber(pbrBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        {/* <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> PBR
          </FootnoteValue>
        </Footnote>
        <Footnote>
          Total locked amount
          <FootnoteValue>
            {totalUserLocked ? `${parseFloat(getBalanceNumber(totalUserLocked).toFixed(2)).toLocaleString('en-US')} PBR` : '~'}
          </FootnoteValue>
        </Footnote>
        <Spacer size="sm" /> */}
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <StyledBalance>
            <img height="50px" src={PolkaBridges} alt="Total PBR Supply"/>
            <Spacer />
            <div style={{ flex: 1 }}>
              <Label text="PBR Circulating Supply" />
              <Value
                value={circulatingSupply ? getBalanceNumber(circulatingSupply) : '~'}
              />
            </div>
          </StyledBalance>
        </CardContent>
        {/* <Footnote>
          Total burned amount
          <FootnoteValue>
            {currentBurned ? `${parseFloat(getBalanceNumber(currentBurned).toFixed(2)).toLocaleString('en-US')} PBR` : '~'}
          </FootnoteValue>
        </Footnote>
        <Footnote>
          Total locked amount
          <FootnoteValue>
            {totalLocked ? `${parseFloat(getBalanceNumber(totalLocked).toFixed(2)).toLocaleString('en-US')} PBR` : '~'}
          </FootnoteValue>
        </Footnote>
        <Spacer size="sm" /> */}
      </Card>
    </StyledWrapper>
  )
})

const Footnote = styled.div`
  font-size: 14px;
  padding: 5px 20px;
  color: ${(props) => props.theme.color.grey[100]};
  background-color: ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  float: right;
  color: ${(props) => props.theme.color.white};
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
