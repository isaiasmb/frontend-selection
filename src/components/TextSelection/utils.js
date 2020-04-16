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
  const newTokens = getNewTokens(startToken, endToken, allTokens)

  const filteredTokens = getFilteredTokens(startToken, newTokens, tokenSelecteds, allTokens)

  return filteredTokens
}

const getNewTokens = (startToken, endToken, allTokens) => {
  const newTokens = []

  if (startToken < endToken) {
    for (let i = startToken; i <= endToken; i++) {
      const token = allTokens[i]
      const tokenWithTag = getTokenWithTag(token, i)
      newTokens.push(tokenWithTag)
    }
  }

  if (startToken > endToken) {
    const start = endToken
    const end = startToken
    for (let i = start; i <= end; i++) {
      const token = allTokens[i]
      const tokenWithTag = getTokenWithTag(token, i)
      newTokens.push(tokenWithTag)
    }
  }

  if (startToken === endToken) {
    const token = allTokens[startToken]
    const tokenWithTag = getTokenWithTag(token, startToken)
    newTokens.push(tokenWithTag)
  }

  return newTokens
}

const getFilteredTokens = (startToken, newTokens, tokenSelecteds) => {
  let filteredTokens = []
  newTokens.forEach(newToken => {
    if (!isCommaOrDot(newToken.value)) {
      filteredTokens.push(newToken)
    }
  })

  tokenSelecteds.forEach(selected => {
    const filteredToken = filteredTokens.find(filtered => filtered.index === selected.index)
    if (!filteredToken) {
      filteredTokens.push(selected)
    }
  })

  const tokenSelected = tokenSelecteds.find(selected => selected.index === startToken)
  if (tokenSelected) {
    newTokens.forEach(token => {
      filteredTokens = filteredTokens.filter(filtered => filtered.index !== token.index)
    })
  }

  return filteredTokens
}

export const getTokenWithTag = (token, index) => {
  const tokenWithTag = {
    value: token,
    index: index,
    tag: 'BANDYER'
  }
  if (startsWithVowel(token)) {
    tokenWithTag.tag = 'BANDYER_VOWEL'
  }
  return tokenWithTag
}

export const startsWithVowel = token => {
  if (typeof token !== 'string') {
    throw new TypeError('The first parameter must be a string')
  }

  const vowelList = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  return vowelList.includes(token[0])
}

export const isSelected = (tokenSelecteds, index) => {
  if (!tokenSelecteds.length) {
    return false
  }

  const tokenSelected = tokenSelecteds.find(selected => selected.index === index)
  if (tokenSelected) {
    return true
  }
  return false
}

export const getTooltipValue = (tokenSelecteds, index) => {
  if (!tokenSelecteds.length) {
    return ''
  }

  const tokenSelected = tokenSelecteds.find(selected => selected.index === index)

  if (!tokenSelected) {
    return ''
  }

  return dictionary[tokenSelected.tag]
}

const dictionary = {
  'BANDYER_VOWEL': 'Starts with a vowel',
  'BANDYER': 'Starts with any character'
}