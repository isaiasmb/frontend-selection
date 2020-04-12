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
