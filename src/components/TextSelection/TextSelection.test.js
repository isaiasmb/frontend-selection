import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import TextSelection from './index'
import * as S from './styled'

chai.use(chaiEnzyme)

const text = `Apollo 13 (April 11–17, 1970) was the seventh crewed mission in the Apollo space.`

describe('TextSelection', () => {
  it('should have a TextSelectionWrapper when mount', () => {
    const wrapper = mount(<TextSelection text={text} />)
    expect(wrapper.find(S.TextSelectionWrapper)).to.have.length(1)
  })

  it('should have the correct number of tokens when mount', () => {
    const wrapper = mount(<TextSelection text={text} />)
    expect(wrapper.find(S.TokenWrapper)).to.have.length(16)
  })

  it('should select a token when tokenSelected was passed', () => {
    const wrapper = mount(<TextSelection text={text} tokenSelected={5} />)
    expect(wrapper.find(S.Token).get(5).props.selected).to.be.true
  })

  it('should select only single token when tokenSelected was passed', () => {
    const wrapper = mount(<TextSelection text={text} tokenSelected={5} />)
    const selections = wrapper.find(S.Token).filterWhere(token => token.props().selected)
    expect(selections).to.have.lengthOf(1)
  })

  it('should select a single token when select any text', () => {
    const handleChange = token => {
      expect(token).to.be.equal(3)
    }
    const wrapper = mount(<TextSelection text={text} tokenSelected={5} onChange={handleChange} />)

    expect(wrapper.find(S.Token).get(5).props.selected).to.be.true
    wrapper.find(S.TokenWrapper).at(3).simulate('mouseDown')
    wrapper.find(S.TokenWrapper).at(6).simulate('mouseUp')
  })

  it('should select a single token different from comma or dot when select any text', () => {
    const handleChange = token => {
      expect(token).to.be.equal(5)
    }
    const wrapper = mount(<TextSelection text={text} tokenSelected={5} onChange={handleChange} />)

    expect(wrapper.find(S.Token).get(5).props.selected).to.be.true
    wrapper.find(S.TokenWrapper).at(4).simulate('mouseDown')
    wrapper.find(S.TokenWrapper).at(15).simulate('mouseUp')
  })
})
