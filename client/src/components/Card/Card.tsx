import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  height: 320;
  width: 300;
  padding: 20px;
  border-radius: 30px;
  overflowy: scroll;
  border: 1px solid #212121;
  filter: drop-shadow(0 0 0.5rem #212121);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`

export default Card
