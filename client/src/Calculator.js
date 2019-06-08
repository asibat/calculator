import React, { Component } from 'react'

import KeyPad from './components/KeyPad'
import { Screen } from './components/Screen'

export default class Calculator extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }

    this.onLoadValue = this.onLoadValue.bind(this)
  }

  onLoadValue(value) {
    this.setState({ value })
  }

  render() {
    return (
      <div className="calculator-container">
        <Screen digit={this.state.value} />
        <KeyPad loadValue={this.onLoadValue.bind(this)} />
      </div>
    )
  }
}
