'use strict'

import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'

import StepStore from '../../../stores/StepStore'

const Step = observer(class Step extends Component {
  render () {
    const {number, heading, children} = this.props
    const mainClassName = number === 5 ? 'step-total-cost' : 'step'

    const classes = ['step', number === 5 ? mainClassName : `${mainClassName}-${number}`]
    if (StepStore.currentStepPosition === number &&
        number !== 5
    ) {
      classes.push('is-active')
    }

    return <li>
      <a className={classes.join(' ')}>
        {number !== 5 && <div className={`${mainClassName}-number`}>{number}</div>}
        <h3 className={`${mainClassName}-heading`}>{heading}</h3>
        {children || <span className='step-value'>-</span>}
      </a>
    </li>
  }
})

Step.propTypes = {
  number: PropTypes.number.isRequired,
  heading: PropTypes.string
}

export default Step
