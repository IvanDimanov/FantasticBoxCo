'use strict'

import React, {Component, createElement} from 'react'
import {observer} from 'mobx-react'

import StepStore from '../../stores/StepStore'

import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'

const stepComponents = [undefined, Step1, Step2, Step3, Step4, Step5]

const StepContent = observer(class StepContent extends Component {
  render () {
    return <section>
      {createElement(stepComponents[StepStore.currentStepPosition])}
    </section>
  }
})

export default StepContent
