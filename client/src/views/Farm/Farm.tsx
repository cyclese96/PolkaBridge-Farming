import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Button from '../../components/Button'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import useFarm from '../../hooks/useFarm'
import useModal from '../../hooks/useModal'
import useRedeem from '../../hooks/useRedeem'
import usePolkaBridge from '../../hooks/usePolkaBridge'
import useBulkPairData from '../../hooks/useBulkPairData'
import { BigNumber } from '../../pbr'
import { getMasterChefContract, getNewRewardPerBlock } from '../../pbr/utils'
import { getContract } from '../../utils/erc20'
import { getBalanceNumber } from '../../utils/formatBalance'
import Apy from './components/Apy'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { Avatar } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import TokenPrice from '../Home/components/TokenPrice'
import TotalValueLocked from '../Home/components/TotalValueLocked'
import TotalClaimReward from '../Home/components/TotalClaimReward'
import Balances from '../Home/components/Balances'
import Footer from '../../components/Footer'


const useStyles = makeStyles((theme) => ({
  earn: {
    textAlign: 'center',
    color: '#f9f9f9',
    fontSize: 12,
  },
  title: {
    color: '#e5e5e5',
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
  },
  titleBalance: {
    textAlign: 'center',
    fontSize: 22,
  },

  desktop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tokenAmount: {
    fontWeight: 700,
    padding: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: '#C80C81',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenTitle: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 14,
    paddingBottom: 3,
    color: '#e5e5e5',
  },
  tokenSubtitle: {
    fontWeight: 300,
    padding: 0,
    paddingLeft: 10,
    fontSize: 12,
    color: '#bdbdbd',
  },
  card: {
    height: 350,
    width: 700,
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(41, 42, 66, 0.3)',
    border: '1px solid #212121',
    filter: 'drop-shadow(0 0 0.5rem #212121)',
    [theme.breakpoints.down('sm')]: {
      height:"100%",
      width: '100%',
    },
  },
  cardBalance: {
    height: 400,
    width: 690,
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(41, 42, 66, 0.3)',
    border: '1px solid #212121',
    filter: 'drop-shadow(0 0 0.5rem #212121)',
    [theme.breakpoints.down('sm')]: {
      height:'100%',
      width: '100%',
    },
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
    border: '1px solid #f9f9f9',
    padding: 12,
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
  },
  buynow: {
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    color: 'white',
    width: 100,
    height: 40,
    textTransform: 'none',
    fontSize: 15,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    '&:hover': {
      background: 'rgba(224, 7, 125, 0.7)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 120,
      fontSize: 15,
    },
  },
  background: {
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  divider: {
    width: 90,
    height: 3,
    background: 'linear-gradient(to right, #e0077d, rgba(0, 0, 0, 0.4))',
  },
  butt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
}))

const Farm: React.FC = () => {
  const classes = useStyles()
  const { farmId } = useParams() as any
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    tokenSymbol,
    token2Symbol,
    earnToken,
    name,
    icon,
    icon2,
    description,
    symbolShort,
    protocal,
    iconProtocal,
    pairLink,
    addLiquidityLink,
    removeLiquidityLink,
    isHot,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    symbolShort: '',
    tokenSymbol: '',
    token2Symbol: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
    symbol: '',
    protocal: '',
    iconProtocal: '',
    pairLink: '',
    addLiquidityLink: '',
    removeLiquidityLink: '',
    isHot: false,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pbr = usePolkaBridge()
  // const pairs = useBulkPairData(['0xa32a983a64ce21834221aa0ad1f1533907553136'])
  // console.log('pairs', pairs)

  const { ethereum, account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className={classes.background}>
          <h1 className={classes.title}>Farm Pools</h1>

          <div className="col mt-5">
            <div className="col-md-8 mb-3">
              <div className={classes.card}>
                <div>
                  <div className={classes.butt}>
                    <PageHeader
                      icon={
                        <div style={{ display: 'flex' }}>
                          <img src={icon} height="50" />
                          &nbsp;
                          <img src={icon2} height="50" />
                        </div>
                      }
                      subtitle={isHot ? '' : description}
                      title={name}
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center"></div>

                  <div className={classes.desktop}>
                    <div className="text-center mt-4">
                      <div className={classes.tokenAmount}>
                        <StyledApyWrap>
                          <Apy
                            pid={pid}
                            lpTokenAddress={lpTokenAddress}
                            symbolShort={symbolShort}
                            tokenSymbol={tokenSymbol}
                            token2Symbol={token2Symbol}
                          />
                        </StyledApyWrap>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mt-5">
              <div className="col-md-8">
                <div className={classes.cardBalance}>
                  <h6 className={classes.title} style={{ color: 'white' }}>
                    Your Balance
                  </h6>
                  <div className="mt-4">
                    <div className="d-flex justify-content-center mt-4">
                      <div className="d-flex justify-content-center">
                        <StyledFarm>
                          {account && (
                            <StyledCardsWrapper>
                              <StyledCardWrapper>
                                <Harvest pid={pid} />
                              </StyledCardWrapper>
                              <Spacer />
                              <StyledCardWrapper>
                                <Stake
                                  lpContract={lpContract}
                                  pid={pid}
                                  tokenName={lpToken.toUpperCase()}
                                  tokenSymbol={tokenSymbol}
                                  token2Symbol={token2Symbol}
                                />
                              </StyledCardWrapper>
                            </StyledCardsWrapper>
                          )}
                          {!account && (
                            <StyledCardsWrapper>
                              <div
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <Button
                                  variant="default"
                                  onClick={onPresentWalletProviderModal}
                                  text="🔓 Unlock Wallet To Continue"
                                />
                              </div>
                            </StyledCardsWrapper>
                          )}
                          <Spacer size="lg" />
                          {!isHot && (
                            <StyledInfo style={{ color: '#ff9800' }}>
                              👉 Every time you stake and unstake LP tokens, the
                              contract will
                              <br />
                              automatically harvest PBR rewards for you!
                            </StyledInfo>
                          )}
                        </StyledFarm>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <StyledCardsWrapper>
              <div >
                <div
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                >
                  MAYBE YOU DON'T KNOW
                </div>
                <StyledInfoLP>
                  <img
                    src={iconProtocal}
                    height="50"
                  />
                  <div
                    style={{
                      width: 'calc(100% - 70px',
                      color: '#ffffff',
                      fontSize: 16,
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    <div>
                      Add/Remove liquidity to{' '}
                      <a
                        style={{
                          color: '#e0077d',
                          textDecoration: 'none',
                        }}
                        href={pairLink}
                        target="__blank"
                      >
                        <b>{symbolShort} pair</b>
                      </a>{' '}
                      on {protocal} to get{' '}
                      <span style={{ color: '#e0077d' }}>{lpToken}</span>{' '}
                      tokens. Then deposit those LP tokens on
                      farm.polkabridge.org to receive rewards
                    </div>
                    <Spacer size="sm" />
                    <a
                      style={{ color: '#e0077d' }}
                      target="__blank"
                      href={addLiquidityLink}
                    >
                      <b>Add Liquidity on {protocal}</b>
                    </a>
                    &nbsp;&nbsp;
                    <a
                      style={{ color: '#e0077d' }}
                      target="__blank"
                      href={removeLiquidityLink}
                    >
                      <b>Remove Liquidity on {protocal}</b>
                    </a>
                  </div>
                </StyledInfoLP>
              </div>
            </StyledCardsWrapper>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

const StyledApyWrap = styled.div`
  width: 600px;
  @media (max-width: 767px) {
    width: 100%;
  }
`
const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding 0 15px;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width: 600px;
  justify-content: center;
  padding-left:50px;
  @media (max-width: 767px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 767px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  
  @media (max-width: 767px) {
    text-align: left;
    br {
      display: none;
    }
  }
`

const StyledHeading = styled.h2`
  color: white;
  opacity: 0.5;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
`

const StyledInfoLP = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 15px 10px;
  background: #00ff5d0f;
  border-radius: 12px;
  margin-top:20px;
  margin-bottom:60px;
  border-radius: 30;
  background-color: rgba(41, 42, 66, 0.3);
  border: 1px solid #212121;
  filter: drop-shadow(0 0 0.5rem #212121),
`

export default Farm
