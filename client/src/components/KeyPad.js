import React, { Component } from 'react'

import { KeyPadView } from '../view/KeyPadView'
import { fetch } from '../api'

const funcValues = {
  C: 'C',
  AC: 'AC'
}

const operations = {
  '=': '=',
  '/': '/',
  x: 'x'
}

export default class KeyPad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: null,
      nextValue: null,
      screenValue: '0',
      operation: null
    }
  }

  handleKeyDown = async event => {
    let { key } = event
    event.preventDefault()

    if (key === 'Enter') {
      key = '='
    }

    if (/\d/.test(key)) {
      this.handleDigit(parseInt(key, 10))
    } else if (key in operations) {
      this.handleOperation(key)
    } else {
      switch (key) {
        case '.':
          this.inputDot()
          break
        case 'Backspace':
          this.handleFunction('AC')
          break
        default:
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  handleDot() {
    const { screenValue } = this.state

    if (!/\./.test(screenValue)) {
      this.setState({ screenValue: screenValue + '.' }, () => this.props.loadValue(this.state.screenValue))
    }
  }

  async handleOperation(nextOperation) {
    const { currentValue, nextValue } = this.state
    let response
    if (currentValue !== null && nextValue !== null) {
      try {
        response = await fetch({ nextOperation, ...this.state })
      } catch (e) {
        console.log(e)
        return
      }
      if (!response) {
        this.props.loadValue(this.state.screenValue)
        return
      }
      const { result, error } = response

      if (error) {
        alert(error)
        this.handleFunction('C')
        return
      }
      this.setState(result, () => this.props.loadValue(this.state.screenValue))
    } else if (currentValue !== null && nextValue === null) {
      this.setState({ operation: nextOperation })
    }
  }

  handleFunction(funcValue) {
    const { AC, C } = funcValues

    switch (funcValue) {
      case C:
        this.setState({ screenValue: '0', currentValue: null, nextValue: null, operation: null }, () =>
          this.props.loadValue(this.state.screenValue)
        )
        break
      case AC:
        const newValue = this.state.screenValue.substring(0, this.state.screenValue.length - 1) || '0'
        this.setState(
          {
            screenValue: newValue,
            currentValue: parseFloat(newValue)
          },
          () => this.props.loadValue(this.state.screenValue)
        )
        break
      default:
    }
  }

  handleDigit(digit) {
    const { currentValue, operation, screenValue, nextValue } = this.state

    if (currentValue === null) {
      const newScreenValue = screenValue === '0' ? String(digit) : screenValue + String(digit)

      this.setState({ currentValue: parseFloat(newScreenValue), screenValue: String(digit) }, () =>
        this.props.loadValue(this.state.screenValue)
      )
    } else if (currentValue !== null && operation) {
      const newScreenValue = !nextValue ? String(digit) : String(screenValue) + String(digit)

      this.setState({ screenValue: newScreenValue, nextValue: parseFloat(newScreenValue) }, () =>
        this.props.loadValue(this.state.screenValue)
      )
    } else if (currentValue !== null && !operation) {
      const newScreenValue = screenValue !== '0' ? String(screenValue) + String(digit) : String(digit)

      this.setState({ currentValue: parseFloat(newScreenValue), screenValue: newScreenValue }, () =>
        this.props.loadValue(this.state.screenValue)
      )
    }
  }

  render() {
    return (
      <KeyPadView
        handleFunction={this.handleFunction.bind(this)}
        handleDigit={this.handleDigit.bind(this)}
        handleOperation={this.handleOperation.bind(this)}
        handleDot={this.handleDot.bind(this)}
      />
    )
  }
}
