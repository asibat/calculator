import React, { Component } from 'react'

import PointTarget from 'react-point'

export default class CalcButton extends Component {
  render() {
    const { onPress, className, ...props } = this.props

    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}>
          {props.screenvalue}
        </button>
      </PointTarget>
    )
  }
}
