import { expect } from 'chai'
import * as utils from './utils'

const text = 'Apollo 13 was the seventh crewed mission in the Apollo space.'
const tokens = ['Apollo', '13', 'was', 'the', 'seventh', 'crewed', 'mission', 'in', 'the', 'Apollo', 'space', '.']

const tokensSelecteds = [
  { value: 'the', index: 3, tag: 'BANDYER' },
  { value: 'seventh', index: 4, tag: 'BANDYER' },
  { value: 'crewed', index: 5, tag: 'BANDYER' }
]

describe('TextSelection utils', () => {
  describe('getTokens', () => {
    it('getTokens should be a function', () => {
      expect(utils.getTokens).to.be.a('function')
    })
  
    it('getTokens(text) should return an array', () => {
      const tokens = utils.getTokens(text)
      expect(tokens).to.be.an('array')
    })
  
    it('getTokens(text) should return an array of tokens', () => {
      const tokensReturned = utils.getTokens(text)
      expect(tokensReturned).to.be.deep.equal(tokens)
    })
  
    it('getTokens(1) should throw a TypeError', () => {
      let error
  
      try {
        utils.getTokens(1)
      } catch (e) {
        error = e
      }
  
      expect(error.name).to.be.equal('TypeError')
    })
  
    it('getTokens(1) should throw a TypeError with message "The first parameter must be a string"', () => {
      let error
  
      try {
        utils.getTokens(1)
      } catch (e) {
        error = e
      }
  
      expect(error.message).to.be.equal('The first parameter must be a string')
    })
  })

  describe('isCommaOrDot', () => {
    it('isCommaOrDot should be a function', () => {
      expect(utils.isCommaOrDot).to.be.a('function')
    })

    it('isCommaOrDot(".") should return true', () => {
      const isCommaOrDot = utils.isCommaOrDot('.')
      expect(isCommaOrDot).to.be.true
    })

    it('isCommaOrDot(",") should return true', () => {
      const isCommaOrDot = utils.isCommaOrDot(',')
      expect(isCommaOrDot).to.be.true
    })

    it('isCommaOrDot("whatever") should return false', () => {
      const isCommaOrDot = utils.isCommaOrDot('whatever')
      expect(isCommaOrDot).to.be.false
    })

    it('isCommaOrDot(1) should throw a TypeError', () => {
      let error
  
      try {
        utils.isCommaOrDot(1)
      } catch (e) {
        error = e
      }
  
      expect(error.name).to.be.equal('TypeError')
    })
  
    it('isCommaOrDot(1) should throw a TypeError with message "The first parameter must be a string"', () => {
      let error
  
      try {
        utils.isCommaOrDot(1)
      } catch (e) {
        error = e
      }
  
      expect(error.message).to.be.equal('The first parameter must be a string')
    })

    it('getTokenSelecteds(3, 5, tokens, []) should return tokensSelecteds', () => {
      const selectedTokens = utils.getTokenSelecteds(3, 5, tokens, [])
      expect(selectedTokens).to.be.deep.equal(tokensSelecteds)
    })

    it('getTokenSelecteds(5, 3, tokens, selectedBefore) should return allTokens', () => {
      const selectedBefore = { value: 'mission', index: 6, tag: 'BANDYER' }
      const allTokens = tokensSelecteds.concat(selectedBefore)
      const selectedTokens = utils.getTokenSelecteds(5, 3, tokens, [selectedBefore])
      expect(selectedTokens).to.be.deep.equal(allTokens)
    })

    it('getTokenSelecteds(5, 5, tokens, []) should return [{ value: "crewed", index: 5, tag: "BANDYER" }]', () => {
      const selectedTokens = utils.getTokenSelecteds(5, 5, tokens, [])
      expect(selectedTokens).to.be.deep.equal([{ value: 'crewed', index: 5, tag: 'BANDYER' }])
    })

    it('getTokenSelecteds(3, 7, tokens, selectedsBefore) should return allTokens', () => {
      const selectedsBefore = [
        { value: 'mission', index: 6, tag: 'BANDYER' },
        { value: 'in', index: 7, tag: 'BANDYER_VOWEL' }
      ]
      const allTokens = tokensSelecteds.concat(selectedsBefore)
      const selectedTokens = utils.getTokenSelecteds(3, 7, tokens, selectedsBefore)
      expect(selectedTokens).to.be.deep.equal(allTokens)
    })
  })
})
