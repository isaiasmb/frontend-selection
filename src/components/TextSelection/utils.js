export const getTokens = text => {
  if (typeof text !== 'string') {
    throw new TypeError('The first parameter must be a string')
  }

  const tokens = text.split(' ')
  const allTokens = Array.from(tokens)

  let counter = 0
  tokens.forEach((token, index) => {
    const lastChar = token.substr(token.length - 1)
    if (isCommaOrDot(lastChar)) {
      const newToken = token.replace(/,|\./, '')
      allTokens.splice(index + counter, 1, newToken, lastChar)
      counter += 1
    }
  })

  return allTokens
}

export const isCommaOrDot = token => {
  if (typeof token !== 'string') {
    throw new TypeError('The first parameter must be a string')
  }

  return !!token.match(/^[,.]/)
}

export const getTokenSelecteds = (startToken, endToken, allTokens, tokenSelecteds) => {
  const newTokenSelecteds = []

  if (startToken < endToken) {
    for (let i = startToken; i <= endToken; i++) {
      newTokenSelecteds.push(i)
    }
  }

  if (startToken > endToken) {
    const start = endToken
    const end = startToken
    for (let i = start; i <= end; i++) {
      newTokenSelecteds.push(i)
    }
  }

  if (startToken === endToken) {
    newTokenSelecteds.push(startToken)
  }

  const filteredTokens = getFilteredTokens(newTokenSelecteds, tokenSelecteds, allTokens)

  return filteredTokens
}

const getFilteredTokens = (newTokenSelecteds, tokenSelecteds, allTokens) => {
  const filteredTokens = []
  newTokenSelecteds.forEach(selected => {
    const token = allTokens[selected]
    if (!isCommaOrDot(token)) {
      filteredTokens.push(selected)
    }
  })

  tokenSelecteds.forEach(token => {
    if (!filteredTokens.includes(token)) {
      filteredTokens.push(token)
    }
  })

  return filteredTokens
}
