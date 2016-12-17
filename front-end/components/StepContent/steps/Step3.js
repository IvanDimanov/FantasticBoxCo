'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import StepStore from '../../../stores/StepStore'
import OrderStore from '../../../stores/OrderStore'

import commonStyles from '../../../commonStyles'

const Step3 = observer(class Step3 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      printQuality: OrderStore.printQuality,

      errors: []
    }

    this.saveContent = this.saveContent.bind(this)
  }

  isContentValid () {
    const {printQuality} = this.state
    return Boolean(printQuality)
  }

  saveContent () {
    const errors = []
    const {printQuality} = this.state

    try {
      OrderStore.setPrintQuality(printQuality)
    } catch (error) {
      errors.push(error.message)
    }

    if (errors.length) {
      this.setState({errors})
      return
    }

    StepStore.nextStep()
  }

  render () {
    const {printQuality, errors} = this.state

    return <div className='content-step'>
      <h2>Step 3 - Print Quality</h2>

      <p className='intro'>
        A variety of printing options are available for any
        branding / logos which are required:
      </p>

      <ol className='btn-radios-list'>
        <li>
          <label>
            <input
              type='radio'
              name='print-quality'
              value='3-colors'
              checked={printQuality === '3-colors'}
              onChange={(event) => this.setState({printQuality: event.target.value})}
            />
            <span className='btn btn-radio'>
              3 colours<br />&pound;{OrderStore.printPrices['3-colors'].label} m<sup>2</sup>
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              name='print-quality'
              value='2-colors'
              checked={printQuality === '2-colors'}
              onChange={(event) => this.setState({printQuality: event.target.value})}
            />
            <span className='btn btn-radio'>
              2 colours<br />&pound;{OrderStore.printPrices['2-colors'].label} m<sup>2</sup>
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              name='print-quality'
              value='black-only'
              checked={printQuality === 'black-only'}
              onChange={(event) => this.setState({printQuality: event.target.value})}
            />
            <span className='btn btn-radio'>
              Black only<br />&pound;{OrderStore.printPrices['black-only'].label} m<sup>2</sup>
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              name='print-quality'
              value='no-printing'
              checked={printQuality === 'no-printing'}
              onChange={(event) => this.setState({printQuality: event.target.value})}
            />
            <span className='btn btn-radio'>
              No printing<br />&pound;{OrderStore.printPrices['no-printing'].label}
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              name='print-quality'
              value='FantasticBoxCo-branding'
              checked={printQuality === 'FantasticBoxCo-branding'}
              onChange={(event) => this.setState({printQuality: event.target.value})}
            />
            <span className='btn btn-radio'>
              <strong>FantasticBoxCo</strong> branding<br />5% discount on total price
            </span>
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
          onClick={this.saveContent}
          disabled={!this.isContentValid()}
        >
          Next
        </button>

        {errors.map((error, index) => <div key={index} style={commonStyles.error}>{error}</div>)}
      </div>
    </div>
  }
})

export default Step3
