import { expect } from 'chai'
import * as utils from './utils'

const text = 'Apollo 13 was the seventh crewed mission in the Apollo space.'
const tokens = ['Apollo', '13', 'was', 'the', 'seventh', 'crewed', 'mission', 'in', 'the', 'Apollo', 'space', '.']

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

    it('getTokenSelecteds(5, 10, tokens, []) should return [5, 6, 7, 8, 9, 10]', () => {
      const selectedTokens = utils.getTokenSelecteds(5, 10, tokens, [])
      expect(selectedTokens).to.be.deep.equal([5, 6, 7, 8, 9, 10])
    })

    it('getTokenSelecteds(10, 5, tokens, []) should return [5, 6, 7, 8, 9, 10]', () => {
      const selectedTokens = utils.getTokenSelecteds(10, 5, tokens, [])
      expect(selectedTokens).to.be.deep.equal([5, 6, 7, 8, 9, 10])
    })

    it('getTokenSelecteds(10, 5, tokens, [11]) should return [5, 6, 7, 8, 9, 10, 11]', () => {
      const selectedTokens = utils.getTokenSelecteds(10, 5, tokens, [11])
      expect(selectedTokens).to.be.deep.equal([5, 6, 7, 8, 9, 10, 11])
    })

    it('getTokenSelecteds(5, 5, tokens, []) should return [5]', () => {
      const selectedTokens = utils.getTokenSelecteds(5, 5, tokens, [])
      expect(selectedTokens).to.be.deep.equal([5])
    })

    it('getTokenSelecteds(3, 7, tokens, [3, 4, 5, 6, 7, 8, 9]) should return [8, 9]', () => {
      const selectedTokens = utils.getTokenSelecteds(3, 7, tokens, [3, 4, 5, 6, 7, 8, 9])
      expect(selectedTokens).to.be.deep.equal([8, 9])
    })
  })
})
