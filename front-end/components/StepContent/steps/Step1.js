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

    this.saveContent = this.saveContent.bind(this)
  }

  isContentValid () {
    const {width, height, length, quantity} = this.state
    return Boolean(width * height * length * quantity)
  }

  saveContent () {
    const errors = []
    const {width, height, length, quantity} = this.state

    try {
      OrderStore.setWidth(width)
    } catch (error) {
      errors.push(error.message)
    }

    try {
      OrderStore.setHeight(height)
    } catch (error) {
      errors.push(error.message)
    }

    try {
      OrderStore.setLength(length)
    } catch (error) {
      errors.push(error.message)
    }

    try {
      OrderStore.setQuantity(quantity)
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
          onChange={(event) => this.setState({width: event.target.value * 1})}
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
          onChange={(event) => this.setState({height: event.target.value * 1})}
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
          onChange={(event) => this.setState({length: event.target.value * 1})}
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
          onChange={(event) => this.setState({quantity: event.target.value * 1})}
        />
      </div>

      <div className='form-actions'>
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
}

export default Step1
