'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import StepStore from '../../../stores/StepStore'
import OrderStore from '../../../stores/OrderStore'

import commonStyles from '../../../commonStyles'

const Step4 = observer(class Step4 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      extras: OrderStore.extras.slice(),

      errors: []
    }
  }

  onExtraChange (extra, isChecked) {
    const errors = []
    const {extras} = this.state

    if (isChecked) {
      extras.push(extra)
    } else {
      const extraIndex = extras.indexOf(extra)
      extras.splice(extraIndex, 1)
    }

    this.setState({extras})

    try {
      OrderStore.setExtras(extras)
    } catch (error) {
      errors.push(error.message)
    }

    if (errors.length) {
      this.setState({errors})
      return
    }
  }

  render () {
    const {extras, errors} = this.state

    return <div className='content-step'>
      <h2>Step 4 - Optional Extras</h2>
      <ol className='btn-radios-list'>
        <li>
          <label>
            <input
              type='checkbox'
              name='optional-extras'
              value='handles'
              checked={extras.indexOf('handles') !== -1}
              onChange={(event) => this.onExtraChange('handles', event.target.checked)}
            />
            <span className='btn btn-radio'>
              Handles<br />&pound;{OrderStore.extrasPrices.handles.label} per box
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='checkbox'
              name='optional-extras'
              value='reinforced-bottom'
              checked={extras.indexOf('reinforced-bottom') !== -1}
              onChange={(event) => this.onExtraChange('reinforced-bottom', event.target.checked)}
              disabled={OrderStore.cardboardGrade !== 'A'}
            />
            <span className='btn btn-radio' style={OrderStore.cardboardGrade !== 'A' ? commonStyles.disabled : {}}>
              Reinforced bottom<br />&pound;{OrderStore.extrasPrices['reinforced-bottom'].label} per box<br />
            </span>

            {OrderStore.cardboardGrade !== 'A' && <span>
              <br />
              <em>Only available with Grade A cardboard</em>
              <br />
              <a style={commonStyles.link} onClick={() => StepStore.gotoStep(2)}>Change Grade</a>
            </span>}
          </label>
        </li>
      </ol>

      <div className='form-actions'>
        <button
          type='button'
          className='btn btn-back'
          onClick={StepStore.backStep}
        >
          back
        </button>

        <button
          type='button'
          className='btn btn-primary btn-next'
          onClick={StepStore.nextStep}
        >
          Next
        </button>

        {errors.map((error, index) => <div key={index} style={commonStyles.error}>{error}</div>)}
      </div>
    </div>
  }
})

export default Step4
