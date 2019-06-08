import React from 'react'
import AutoScale from './AutoScale'

export const Screen = props => {
  const { digit } = props
  return (
    <div className="calculator-display">
      <AutoScale>{digit || 0}</AutoScale>
    </div>
  )
}
