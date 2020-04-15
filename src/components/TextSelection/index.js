import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as utils from './utils'
import * as S from './styled'

const TextSelection = ({ text, tokenSelecteds, onChange }) => {
  const [tokens, setTokens] = useState(null)
  const [startToken, setStartToken] = useState(null)
  const [browserSelection, setBrowserSelection] = useState(null)

  useEffect(() => {
    let browserSelection = null
    if (document && document.getSelection) {
      browserSelection = document.getSelection()
    }
    setBrowserSelection(browserSelection)
    const tokens = utils.getTokens(text)
    setTokens(tokens)
  }, [text])

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
              if (onChange && startToken !== null) {
                const newTokenSelecteds = utils.getTokenSelecteds(startToken, index, tokens, tokenSelecteds)
                onChange(newTokenSelecteds)
              }

              if (browserSelection) {
                browserSelection.removeAllRanges()
              }
            }}
            key={index}>
            {
              !utils.isCommaOrDot(token) &&
              <> </>
            }
            <S.Token
              selected={tokenSelecteds.includes(index)}>
              {token}
            </S.Token>
          </S.TokenWrapper>
        ))
      }
    </S.TextSelectionWrapper>
  )
}

TextSelection.defaultProps = {
  tokenSelecteds: []
}

TextSelection.propTypes = {
  text: PropTypes.string.isRequired,
  tokenSelecteds: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func
}

export default TextSelection
