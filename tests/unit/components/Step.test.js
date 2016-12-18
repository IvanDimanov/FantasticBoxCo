/* global describe it */
'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Step from '../../../front-end/components/StepIndicator/steps/Step'

describe('<Step />', () => {
  it('is a <li>', () => {
    expect(shallow(<Step number={1} />).is('li')).to.equal(true)
  })

  it('have a <a>', () => {
    expect(shallow(<Step number={1} />).find('a').length).to.equal(1)
  })

  it('have a correctly styled <a>', () => {
    expect(shallow(<Step number={1} />).find('a').is('.step')).to.equal(true)
  })

  it('have {number} indicator', () => {
    expect(shallow(<Step number={1} />).find('.step-number').length).to.equal(1)
    expect(shallow(<Step number={1} />).find('.step-number').text()).to.equal('1')
  })

  it('have {heading} indicator', () => {
    expect(shallow(<Step number={1} heading='Test' />).find('.step-heading').length).to.equal(1)
    expect(shallow(<Step number={1} heading='Test' />).find('.step-heading').text()).to.equal('Test')
  })

  it('have default content', () => {
    expect(shallow(<Step number={1} />).find('.step-value').length).to.equal(1)
    expect(shallow(<Step number={1} />).find('.step-value').text()).to.equal('-')
  })

  it('render custom content', () => {
    expect(shallow(<Step number={1}><div className='test'>Test</div></Step>).find('.test').length).to.equal(1)
    expect(shallow(<Step number={1}><div className='test'>Test</div></Step>).find('.test').text()).to.equal('Test')
  })
})
