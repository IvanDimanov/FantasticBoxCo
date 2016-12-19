'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import StepStore from '../../../stores/StepStore'
import OrderStore from '../../../stores/OrderStore'

const Step5 = observer(class Step5 extends Component {
  render () {
    return <div className='content-step'>
      <h2>Total Cost</h2>

      <dl className='breakdown'>
        <dt>Dimensions &amp; Quantity:</dt>
        <dd>{OrderStore.quantityLabel} &times; {OrderStore.widthLabel}(W)&times;{OrderStore.heightLabel}(H)&times;{OrderStore.lengthLabel}(L)</dd>

        <dt>Cardboard Grade:</dt>
        <dd>{OrderStore.cardboardGrade} grade</dd>

        <dt>Print Quality:</dt>
        <dd>{OrderStore.printQualityLabel}</dd>

        <dt>Optional Extras:</dt>
        {!OrderStore.extrasLabels.length && <em>(none)</em>}

        {OrderStore.extrasLabels.length && <dd>
          <ol>
            {OrderStore.extrasLabels.map((extrasLabel, index) => <li key={index}>{extrasLabel}</li>)}
          </ol>
        </dd>}

        <dt>Total Cost:</dt>
        <dd>&pound;{OrderStore.priceLabel}</dd>
      </dl>

      <div className='form-actions'>
        <button
          type='button'
          className='btn btn-back'
          onClick={() => {
            OrderStore.init()
            StepStore.gotoStep(1)
          }}
        >
          New Order
        </button>
      </div>
    </div>
  }
})

export default Step5
