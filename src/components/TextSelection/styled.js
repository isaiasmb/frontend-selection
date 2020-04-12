import styled from 'styled-components'

export const TextSelectionWrapper = styled.div``

export const TokenWrapper = styled.span``

export const Token = styled.span`
  background-color: ${props => props.selected ? '#4487ff' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#333333'};
  padding: ${props => props.selected ? '3px' : '0'};
  line-height: 1.4;
`
