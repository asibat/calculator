const isValidOperation = (currentOperation, nextValue) => operation !== '/' && nextValue !== 0

const operations = {
  '/': (a, b) => (a / b).toFixed(2),
  x: (a, b) => (a * b).toFixed(2)
}

module.exports = {
  async process(stateObject) {
    const { currentValue, nextValue, operation, nextOperation } = stateObject
    const data = {
      error: '',
      result: {}
    }

    if (operation === '/' && nextValue === 0) {
      data.error = 'division by zero'
      return data
    }
    const total = parseFloat(operations[operation](currentValue, nextValue))

    data.result = {
      screenValue: String(total),
      currentValue: total,
      nextValue: null,
      operation: nextOperation === '=' ? null : nextOperation
    }

    return data
  }
}
