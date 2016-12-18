'use strict'

import {action, extendObservable, useStrict} from 'mobx'

useStrict(true)

function StepStore () {
  const minStepPosition = 1
  const maxStepPosition = 5

  extendObservable(this, {
    currentStepPosition: minStepPosition,

    nextStep: () => () => {
      if (this.currentStepPosition === maxStepPosition) {
        throw new RangeError(`Maximum steps of ${maxStepPosition} are already reached`)
      }

      action(() => this.currentStepPosition++)()
    },

    backStep: () => () => {
      if (this.currentStepPosition === minStepPosition) {
        throw new RangeError(`Current step is already in its initial position of ${this.currentStepPosition}`)
      }

      action(() => this.currentStepPosition--)()
    },

    gotoStep: () => (newStepPosition) => {
      if (newStepPosition !== parseInt(newStepPosition)) {
        throw new TypeError(`Requested step "${newStepPosition}" is invalid {Integer}`)
      }

      if (newStepPosition < minStepPosition) {
        throw new RangeError(`Requested step ${newStepPosition} is lower than the minimal step limit of ${minStepPosition}`)
      }

      if (newStepPosition > maxStepPosition) {
        throw new RangeError(`Requested step ${newStepPosition} is higher than the maximum step limit of ${maxStepPosition}`)
      }

      action(() => (this.currentStepPosition = newStepPosition))()
    }
  })
}

export default new StepStore()
export const StepStoreConstructor = StepStore
