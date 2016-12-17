'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import OrderStore from '../../../stores/OrderStore'

import Step from './Step'

const Step3 = observer(class Step3 extends Component {
  render () {
    return <Step
      number={3}
      heading='Print Quality'
    >
      {OrderStore.printQuality && <dl>
        <dt>Quality:</dt>
        <dd>{OrderStore.printQualityLabel}</dd>
      </dl>}
    </Step>
  }
})

export default Step3
