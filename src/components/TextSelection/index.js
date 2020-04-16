import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
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
        tokens.map((token, index) => {
          const key = Math.random()
          return (
            <S.TokenWrapper
              data-tip=''
              data-for={`token-tooltip${key}`}
              data-class='token-tooltip'
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
                selected={utils.isSelected(tokenSelecteds, index)}>
                {token}
              </S.Token>
              {
                utils.isSelected(tokenSelecteds, index) &&
                <ReactTooltip
                  id={`token-tooltip${key}`}
                  place='top'
                  type='dark'
                  effect='solid'
                  getContent={() => <div>{utils.getTooltipValue(tokenSelecteds, index)}</div>} />
              }
            </S.TokenWrapper>
          )
        })
      }
    </S.TextSelectionWrapper>
  )
}

TextSelection.defaultProps = {
  tokenSelecteds: []
}

TextSelection.propTypes = {
  text: PropTypes.string.isRequired,
  tokenSelecteds: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
}

export default TextSelection
