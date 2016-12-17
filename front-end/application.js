'use strict'

import React from 'react'
import {render} from 'react-dom'

import StepIndicator from './components/StepIndicator'
import StepContent from './components/StepContent'

import StepStore from './stores/StepStore'

const Main = () => <div>
  <header>
    <h1 className={'logo'}>FantasticBoxCo</h1>
  </header>

  <main>
    <div className={'container'}>
      <StepIndicator />
      <StepContent />
    </div>
  </main>
</div>

render(<Main />, document.getElementById('main_app'))
