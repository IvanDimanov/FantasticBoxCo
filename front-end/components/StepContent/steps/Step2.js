'use strict'

import React, {Component} from 'react'
import {observer} from 'mobx-react'

import StepStore from '../../../stores/StepStore'
import OrderStore from '../../../stores/OrderStore'

import commonStyles from '../../../commonStyles'

const Step2 = observer(class Step2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cardboardGrade: OrderStore.cardboardGrade,

      errors: []
    }

    this.saveContent = this.saveContent.bind(this)
  }

  isContentValid () {
    const {cardboardGrade} = this.state
    return Boolean(cardboardGrade)
  }

  saveContent () {
    const errors = []
    const {cardboardGrade} = this.state

    try {
      OrderStore.setCardboardGrade(cardboardGrade)
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
    const {cardboardGrade, errors} = this.state

    return <div className='content-step'>
      <h2>Step 2 - Cardboard Grade</h2>

      <p className='intro'>
        <strong>FantasticBoxCo</strong> offer a variety of
        grades of cardboard, each altering the price per m<sup>2</sup>:
      </p>

      <ol className='btn-radios-list'>
        <li>
          <label>
            <input
              type='radio'
              name='cardboard-grade'
              value='A'
              checked={cardboardGrade === 'A'}
              onChange={((event) => this.setState({cardboardGrade: event.target.value}))}
            />
            <span className='btn btn-radio'>
              A Grade<br />&pound;{OrderStore.cardboardGradePrices.A.label} m<sup>2</sup>
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              name='cardboard-grade'
              value='B'
              checked={cardboardGrade === 'B'}
              onChange={((event) => this.setState({cardboardGrade: event.target.value}))}
            />
            <span className='btn btn-radio'>
              B Grade<br />&pound;{OrderStore.cardboardGradePrices.B.label} m<sup>2</sup>
            </span>
          </label>
        </li>

        <li>
          <label>
            <input
              type='radio'
              name='cardboard-grade'
              value='C'
              checked={cardboardGrade === 'C'}
              onChange={((event) => this.setState({cardboardGrade: event.target.value}))}
              disabled={OrderStore.area > 2}
            />
            <span className='btn btn-radio' style={OrderStore.area > 2 ? commonStyles.disabled : {}}>
              C Grade<br />&pound;{OrderStore.cardboardGradePrices.C.label} m<sup>2</sup>
            </span>

            {OrderStore.area > 2 && <span>
              <br />
              <em>Not available for boxes larger than 2M^2</em>
              <br />
              <a style={commonStyles.link} onClick={() => StepStore.gotoStep(1)}>Change size</a>
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

export default Step2
