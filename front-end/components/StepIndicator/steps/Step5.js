'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import OrderStore from '../../../stores/OrderStore'

import Step from './Step'

const Step5 = observer(class Step5 extends Component {
  render () {
    return <Step
      number={5}
      heading='Total Cost'
    >
      <div className='step-total-cost-value'>&pound;{OrderStore.priceLabel}</div>
    </Step>
  }
})

export default Step5
