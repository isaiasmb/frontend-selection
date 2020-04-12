import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as utils from './utils'
import * as S from './styled'

const TextSelection = ({ text, tokenSelected, onChange }) => {
  const [tokens, setTokens] = useState(null)
  const [startToken, setStartToken] = useState(null)
  const [endToken, setEndToken] = useState(null)
  const [browserSelection, setBrowserSelection] = useState(null)

  useEffect(() => {
    const tokens = utils.getTokens(text)
    setTokens(tokens)
  }, [text])

  useEffect(() => {
    if (onChange && startToken) {
      onChange(startToken)
    }
    
    if (browserSelection) {
      browserSelection.removeAllRanges()
    }
  }, [endToken])

  return (
    <S.TextSelectionWrapper>
      {
        tokens &&
        tokens.map((token, index) => (
          <S.TokenWrapper
            onMouseDown={() => {
              if (utils.isCommaOrDot(token)) {
                return
              }
              setStartToken(index)
            }}
            onMouseUp={() => {
              if (utils.isCommaOrDot(token)) {
                return
              }
              let browserSelection = null
              if (document && document.getSelection) {
                browserSelection = document.getSelection()
              }
              setBrowserSelection(browserSelection)
              setEndToken(index)
            }}
            key={index}>
            {
              !utils.isCommaOrDot(token) &&
              <> </>
            }
            <S.Token
              selected={index === tokenSelected}>
              {token}
            </S.Token>
          </S.TokenWrapper>
        ))
      }
    </S.TextSelectionWrapper>
  )
}

TextSelection.propTypes = {
  text: PropTypes.string.isRequired,
  tokenSelected: PropTypes.number,
  onChange: PropTypes.func
}

export default TextSelection
