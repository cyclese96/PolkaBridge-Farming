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
import TotalValueLocked from './components/TotalValueLocked';
import TotalClaimReward from './components/TotalClaimReward';
import TokenPrice from './components/TokenPrice';

const Home: React.FC = () => {
  var block = 99999999999
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()

  return (
    <Page>
        <SpacerRes>
            <Spacer size="lg" />
            <StyledLogo>
                <img className="d-md-none" src={PolkaBridgeLogo} height="120" style={{ marginTop: -4 }} />
            </StyledLogo>
        </SpacerRes>
        <Spacer size="lg" />
        <div style={{fontWeight: 'bold', fontSize: 22, color: '#ffffff', textAlign: 'center'}}>
            PBR Price: <span style={{color: '#e0077d', fontSize: 30}}>$<TokenPrice /></span>
        </div>
        <div style={{fontWeight: 'bold', fontSize: 22, color: '#ffffff', textAlign: 'center'}}>
            Total Value Locked (TVL): <span style={{color: '#e0077d', fontSize: 30}}>$<TotalValueLocked /></span>
        </div>

        <div style={{fontWeight: 'bold', fontSize: 22, color: '#ffffff', textAlign: 'center'}}>
            Total Claimed Rewards: <span style={{color: '#e0077d', fontSize: 30}}><TotalClaimReward /> PBR</span>
        </div>

        {block < launchBlock && atDate && <>
            <Spacer size="sm" />
            <CustomCountDown date={atDate}/>
            <Spacer size="md" />
            <div>
                <ReadMore href="https://t.me/polkabridge" target="__blank"> Read The Announcement</ReadMore>
                <ReadMore href="https://youtu.be/xBnpTe1qdAc?t=169" target="__blank"> Video Tutorial</ReadMore>
                <div style={{color: 'rgb(255,255,255,0.6)', textAlign: 'center', marginTop: 5}}>Contract was fully audited by CertiK. Check report <a href="https://certik.org/projects/polkabridge" target="_blank">here</a>.</div>
             
            </div>
            <Spacer size="lg" />
            </>
        }
        {block >= launchBlock && <>
            <Spacer size="lg" />
            <Container>
                <Balances />
            </Container>
            <Spacer size="md" />
            <div style={{textAlign: 'center'}}>
                <ReadMore href="https://t.me/polkabridge" target="__blank"> Read The Announcement </ReadMore>
                <ReadMore href="https://youtu.be/xBnpTe1qdAc?t=169" target="__blank"> Video Tutorial</ReadMore>
                <div style={{color: 'rgb(255,255,255,0.6)', textAlign: 'center', marginTop: 5}}>Contract was fully audited by CertiK. Check report <a href="https://certik.org/projects/polkabridge" target="_blank">here</a>.</div>
              
            </div>
            {/*<Spacer size="lg" />*/}
            </>
        }
        <Spacer size="lg" />
        <Container size = "lg">
            <div style={{
                border: '1px solid #2C3030'
                }}>
            </div>
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

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  > img{
    width: 20px;
    margin-right: 3px;
  }
  b {
    color: ${(props) => props.theme.color.primary.main};
  }
`
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
  text-decoration: none;
  font-weight: bold;
  color: #ffffff;
  display: inline-block;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid #e0077d70;
  background: #ffec0b0d;
  font-size: 14px;
  margin-top: 10px;
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
