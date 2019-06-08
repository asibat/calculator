import React from 'react'

import CalcButton from '../components/CalcButton'

export const KeyPadView = props => {
  const { handleFunction, handleDigit, handleOperation, handleDot } = props

  return (
    <div className="keypad">
      <div className="key">
        <div className="input-keys">
          <div className="function-keys">
            <CalcButton screenvalue="AC" onPress={() => handleFunction('AC')} />
            <CalcButton screenvalue="C" onPress={() => handleFunction('C')} />
          </div>
          <div className="digit-keys">
            <CalcButton className="key-0" screenvalue={0} onPress={() => handleDigit(0)} />
            <CalcButton
              className="key-dot"
              screenvalue="●"
              style={{ fontSize: '0.75em' }}
              onPress={() => handleDot()}
            />
            <CalcButton screenvalue={1} onPress={() => handleDigit(1)} />
            <CalcButton screenvalue={2} onPress={() => handleDigit(2)} />
            <CalcButton screenvalue={3} onPress={() => handleDigit(3)} />
            <CalcButton screenvalue={4} onPress={() => handleDigit(4)} />
            <CalcButton screenvalue={5} onPress={() => handleDigit(5)} />
            <CalcButton screenvalue={6} onPress={() => handleDigit(6)} />
            <CalcButton screenvalue={7} onPress={() => handleDigit(7)} />
            <CalcButton screenvalue={8} onPress={() => handleDigit(8)} />
            <CalcButton screenvalue={9} onPress={() => handleDigit(9)} />
          </div>
        </div>
        <div className="operator-keys">
          <CalcButton className="key-divide" screenvalue="÷" onPress={() => handleOperation('/')} />
          <CalcButton className="key-multiply" screenvalue="×" onPress={() => handleOperation('x')} />
          <CalcButton className="key-equals" screenvalue="=" onPress={() => handleOperation('=')} />
        </div>
      </div>
    </div>
  )
}
