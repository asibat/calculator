import React, { Component } from 'react'

export default class CalcButton extends Component {
  render() {
    const { onPress, className, ...props } = this.props

    return (
      <button className={`calculator-key ${className}`} {...props} onTouchStart={onPress}>
        {props.screenvalue}
      </button>
    )
  }
}
