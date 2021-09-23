import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
// import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import CustomCountDown from './components/CustomCountDown'
import { START_REWARD_AT_BLOCK } from '../../pbr/lib/constants'
import PolkaBridgeLogo from '../../assets/img/logo-icon.svg'
import FarmCards from '../Farms/components/FarmCards'
import TotalValueLocked from './components/TotalValueLocked'
import TotalClaimReward from './components/TotalClaimReward'
import TokenPrice from './components/TokenPrice'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
    textAlign: 'left',
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
      minWidth: 240,
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

const Home: React.FC = () => {
  var block = 99999999999
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()
  const classes = useStyles()
  return (
    <Page>
      <div className="container">
        <div className={classes.background}>
          <h1 className={classes.title}>Farm Pools</h1>
          <div className={classes.divider} />
          <div className="row mt-5">
            <div className="col-md-8 mb-3">
              <div className={classes.card}>
                <div>
                  <div className={classes.butt}>
                    <Avatar
                      src={'https://stake.polkabridge.org/img/symbol.png'}
                      className={classes.logo}
                    />
                  </div>
                  <div className={classes.butt}>
                    <h6 className={classes.title}>PBR Statistics</h6>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      style={{
                        backgroundColor: '#C80C81',
                        borderRadius: '50%',
                        height: '5px',
                        width: '5px',
                        marginRight: 5,
                      }}
                    >
                      .
                    </div>
                    <div className={classes.earn}>
                      All in one defi application
                    </div>
                  </div>
                  <div className={classes.butt}>
                    <a
                      target="_blank"
                      href="https://app.uniswap.org/#/swap?inputCurrency=0x298d492e8c1d909d3f63bc4a36c66c64acb3d695&outputCurrency=ETH&use=V2"
                    >
                      <div className={classes.buynow}> Buy Now</div>
                    </a>
                  </div>

                  <div className={classes.desktop}>
                    <div className="text-center mt-4">
                      <div className={classes.tokenTitle}>PBR Price: </div>
                      <div className={classes.tokenAmount}>
                        $<TokenPrice />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className={classes.tokenTitle}>
                        Total Value Locked (TVL):{' '}
                      </div>
                      <div className={classes.tokenAmount}>
                        {' '}
                        $<TotalValueLocked />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className={classes.tokenTitle}>
                        Total Claimed Rewards:{' '}
                      </div>
                      <div className={classes.tokenAmount}>
                        <TotalClaimReward />
                        PBR
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <Balances />
              </div>
            </div>
          </div>
        </div>
      </div>

      {block < launchBlock && atDate && (
        <>
          <Spacer size="sm" />
          <CustomCountDown date={atDate} />
          <Spacer size="md" />
          <div>
            <ReadMore href="https://t.me/polkabridge" target="__blank">
              {' '}
              Read The Announcement
            </ReadMore>
            <ReadMore
              href="https://youtu.be/xBnpTe1qdAc?t=169"
              target="__blank"
            >
              {' '}
              Video Tutorial
            </ReadMore>
            <div
              style={{
                color: 'rgb(255,255,255,0.6)',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              Contract was fully audited by CertiK. Check report{' '}
              <a href="https://certik.org/projects/polkabridge" target="_blank">
                here
              </a>
              .
            </div>
          </div>
          <Spacer size="lg" />
        </>
      )}
      {block >= launchBlock && (
        <>
          <Spacer size="lg" />
          <Spacer size="md" />
          <div style={{ textAlign: 'center' }}>
            <ReadMore
              href="https://t.me/polkabridge"
              target="__blank"
              style={{
                textAlign: 'center',
                marginBottom: 15,
                borderRadius: 20,
                height: 40,
              }}
            >
              {' '}
              Read The Announcement{' '}
            </ReadMore>
            <ReadMore
              href="https://youtu.be/xBnpTe1qdAc?t=169"
              target="__blank"
              style={{
                textAlign: 'center',
                marginBottom: 15,
                borderRadius: 20,
                height: 40,
              }}
            >
              {' '}
              Video Tutorial
            </ReadMore>
            <div
              style={{
                color: 'rgb(255,255,255,0.6)',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              Contract was fully audited by CertiK. Check report{' '}
              <a href="https://certik.org/projects/polkabridge" target="_blank">
                here
              </a>
              .
            </div>
          </div>
          {/*<Spacer size="lg" />*/}
        </>
      )}
      <Spacer size="lg" />
      <Container size="lg">
        <div
          style={{
            border: '1px solid #2C3030',
          }}
        ></div>
      </Container>
      <Box className="mt-4">
        <StyledHeading>SELECT YOUR FIELDS</StyledHeading>
        <StyledParagraph>Earn PBR tokens by staking LP token</StyledParagraph>
        <Spacer size="lg" />
        <FarmCards />
      </Box>
    </Page>
  )
}

const StyledHeading = styled.h2`
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
`
const StyledParagraph = styled.p`
  color: ${(props) => props.theme.color.grey[100]};
  text-align: center;
  margin-top: 10px;
`

const ReadMore = styled.a`
  background: linear-gradient(to bottom, #d9047c, #bf1088);
  color: white;
  width: 100;
  height: 80;
  text-transform: none;
  font-size: 15;
  border-radius: 40;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20;
  margin-right: 30;
  '&:hover': {
    background: rgba(224, 7, 125, 0.7);
  }
`

const StyledLogo = styled.div`
  .d-md-none {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .d-lg-none {
    @media (min-width: 1025px) {
      display: none;
    }
  }
`

const Box = styled.div`
  &.mt-4 {
    margin-top: 40px;
    @media (max-width: 767px) {
      margin-top: 30px;
    }
  }
`
const SpacerRes = styled.div`
  .sc-iCoHVE {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .d-lg-none {
    @media (min-width: 1025px) {
      display: none;
    }
  }
`
export default Home
