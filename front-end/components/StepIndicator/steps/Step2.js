'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import OrderStore from '../../../stores/OrderStore'

import Step from './Step'

const Step2 = observer(class Step2 extends Component {
  render () {
    return <Step
      number={2}
      heading='Cardboard Grade'
    >
      {OrderStore.cardboardGrade && <dl>
        <dt>Grade:</dt>
        <dd>{OrderStore.cardboardGrade}</dd>
      </dl>}
    </Step>
  }
})

export default Step2
