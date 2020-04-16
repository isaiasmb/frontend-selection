import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import TextSelection from './index'
import * as S from './styled'

chai.use(chaiEnzyme)

const text = 'Apollo 13 was the seventh crewed mission in the Apollo space.'

const tokensSelecteds = [
  { value: 'the', index: 3, tag: 'BANDYER' },
  { value: 'seventh', index: 4, tag: 'BANDYER' },
  { value: 'crewed', index: 5, tag: 'BANDYER' }
]

describe('TextSelection', () => {
  it('should have a TextSelectionWrapper when mount', () => {
    const wrapper = mount(<TextSelection text={text} />)
    expect(wrapper.find(S.TextSelectionWrapper)).to.have.length(1)
  })

  it('should have the correct number of tokens when mount', () => {
    const wrapper = mount(<TextSelection text={text} />)
    expect(wrapper.find(S.TokenWrapper)).to.have.length([12])
  })

  it('should select a token when tokenSelecteds was passed', () => {
    const wrapper = mount(<TextSelection text={text} tokenSelecteds={[{ value: 'crewed', index: 5, tag: 'BANDYER' }]} />)
    expect(wrapper.find(S.Token).get(5).props.selected).to.be.true
  })

  it('should select only single token when tokenSelecteds was passed', () => {
    const wrapper = mount(<TextSelection text={text} tokenSelecteds={[{ value: 'crewed', index: 5, tag: 'BANDYER' }]} />)
    const selections = wrapper.find(S.Token).filterWhere(token => token.props().selected)
    expect(selections).to.have.lengthOf(1)
  })

  it('should select a multiple token when select any text', () => {
    const handleChange = token => {
      const allTokensSelecteds = tokensSelecteds.concat({ value: 'mission', index: 6, tag: 'BANDYER' })
      expect(token).to.be.deep.equal(allTokensSelecteds)
    }
    const wrapper = mount(<TextSelection text={text} tokenSelecteds={[{ value: 'crewed', index: 5, tag: 'BANDYER' }]} onChange={handleChange} />)

    expect(wrapper.find(S.Token).get(5).props.selected).to.be.true
    wrapper.find(S.TokenWrapper).at(6).simulate('mouseDown')
    wrapper.find(S.TokenWrapper).at(3).simulate('mouseUp')
  })

  it('should select a multiple token different from comma or dot when select any text', () => {
    const handleChange = token => {
      expect(token).to.be.deep.equal([{ value: 'space', index: 10, tag: 'BANDYER' }])
    }
    const wrapper = mount(<TextSelection text={text} tokenSelecteds={[]} onChange={handleChange} />)

    wrapper.find(S.TokenWrapper).at(10).simulate('mouseDown')
    wrapper.find(S.TokenWrapper).at(11).simulate('mouseUp')
  })
})
