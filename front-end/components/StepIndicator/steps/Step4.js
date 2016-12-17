'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import OrderStore from '../../../stores/OrderStore'

import Step from './Step'

const Step4 = observer(class Step4 extends Component {
  render () {
    return <Step
      number={4}
      heading='Optional Extras'
    >
      {OrderStore.extras.length && OrderStore.extrasLabels.map((extraLabel, index) => <dl key={index}>
        <dt>Extra:</dt>
        <dd>{extraLabel}</dd>
      </dl>)}
    </Step>
  }
})

export default Step4
