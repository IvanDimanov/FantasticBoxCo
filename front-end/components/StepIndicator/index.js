'use strict'

import React from 'react'

import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'

const StepIndicator = () => {
  return <aside>
    <ul className='progress'>
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Step5 />
    </ul>
  </aside>
}

export default StepIndicator
