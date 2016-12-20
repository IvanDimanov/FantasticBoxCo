'use strict'

import React, {Component} from 'react'

import StepStore from '../../../stores/StepStore'
import OrderStore from '../../../stores/OrderStore'

import commonStyles from '../../../commonStyles'

class Step1 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: OrderStore.width,
      height: OrderStore.height,
      length: OrderStore.length,
      quantity: OrderStore.quantity,

      errors: []
    }
  }

  isContentValid () {
    const {width, height, length, quantity} = this.state
    return Boolean(width * height * length * quantity)
  }

  render () {
    const {width, height, length, quantity, errors} = this.state

    return <div className='content-step'>
      <h2>Step 1 - Dimensions &amp; Quantity</h2>

      <p className='intro'>
        Enter the width, height, length and quantity of the box(es) you require.
      </p>

      <div className='form-row'>
        <label htmlFor='width'>Width:</label>
        <input
          type='number'
          id='width'
          min='0'
          step='0.01'
          value={width}
          onChange={(event) => {
            const {errors} = this.state
            try {
              const width = event.target.value * 1
              this.setState({width})
              OrderStore.setWidth(width)
            } catch (error) {
              errors.push(error.message)
            }
            this.setState({errors})
          }}
          autoFocus
        />
      </div>

      <div className='form-row'>
        <label htmlFor='height'>Height:</label>
        <input
          type='number'
          id='height'
          min='0'
          step='0.01'
          value={height}
          onChange={(event) => {
            const {errors} = this.state
            try {
              const height = event.target.value * 1
              this.setState({height})
              OrderStore.setHeight(height)
            } catch (error) {
              errors.push(error.message)
            }
            this.setState({errors})
          }}
        />
      </div>

      <div className='form-row'>
        <label htmlFor='length'>Length:</label>
        <input
          type='number'
          id='length'
          min='0'
          step='0.01'
          value={length}
          onChange={(event) => {
            const {errors} = this.state
            try {
              const length = event.target.value * 1
              this.setState({length})
              OrderStore.setLength(length)
            } catch (error) {
              errors.push(error.message)
            }
            this.setState({errors})
          }}
        />
      </div>

      <div className='form-row'>
        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='number'
          id='quantity'
          min='0'
          step='1'
          value={quantity}
          onChange={(event) => {
            const {errors} = this.state
            try {
              const quantity = event.target.value * 1
              this.setState({quantity})
              OrderStore.setQuantity(quantity)
            } catch (error) {
              errors.push(error.message)
            }
            this.setState({errors})
          }}
        />
      </div>

      <div className='form-actions'>
        <button
          type='button'
          className='btn btn-primary btn-next'
          onClick={StepStore.nextStep}
          disabled={!this.isContentValid()}
        >
          Next
        </button>

        {errors.map((error, index) => <div key={index} style={commonStyles.error}>{error}</div>)}
      </div>
    </div>
  }
}

export default Step1
