'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import OrderStore from '../../../stores/OrderStore'

import Step from './Step'

const Step1 = observer(class Step1 extends Component {
  render () {
    return <Step
      number={1}
      heading='Dimensions &amp; Quantity'
    >
      <dl>
        <dt>Width:</dt>
        <dd>{OrderStore.widthLabel}m</dd>

        <dt>Height:</dt>
        <dd>{OrderStore.heightLabel}m</dd>

        <dt>Length:</dt>
        <dd>{OrderStore.lengthLabel}m</dd>

        <dt>Quantity:</dt>
        <dd>{OrderStore.quantityLabel}</dd>
      </dl>
    </Step>
  }
})

export default Step1
