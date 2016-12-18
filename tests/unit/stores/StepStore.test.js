/* global beforeEach describe it */
'use strict'

import { expect } from 'chai'

import {StepStoreConstructor} from '../../../front-end/stores/StepStore'

let StepStore
beforeEach(() => {
  StepStore = new StepStoreConstructor()
})

describe('StepStore', () => {
  it('init step', () => {
    expect(StepStore.currentStepPosition).to.equal(1)
  })

  it('increment on Next', () => {
    StepStore.nextStep()
    StepStore.nextStep()
    StepStore.nextStep()
    expect(StepStore.currentStepPosition).to.equal(4)
  })

  it('decrement on Back', () => {
    StepStore.nextStep()
    StepStore.nextStep()
    StepStore.nextStep()

    StepStore.backStep()
    StepStore.backStep()
    StepStore.backStep()

    expect(StepStore.currentStepPosition).to.equal(1)
  })

  it('have a maximum of 5 steps', () => {
    StepStore.nextStep()
    StepStore.nextStep()
    StepStore.nextStep()
    StepStore.nextStep()

    expect(StepStore.currentStepPosition).to.equal(5)
    expect(StepStore.nextStep).to.throw()
  })

  it('have a minimum of 1 step', () => {
    expect(StepStore.currentStepPosition).to.equal(1)
    expect(StepStore.backStep).to.throw()
  })

  it('can go directly to step 3', () => {
    StepStore.gotoStep(3)
    expect(StepStore.currentStepPosition).to.equal(3)
  })

  it('cannot go directly to step 6', () => {
    expect(() => StepStore.gotoStep(6)).to.throw()
  })

  it('cannot go directly to step 0', () => {
    expect(() => StepStore.gotoStep(0)).to.throw()
  })
})
