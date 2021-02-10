class Operator {
  value
  calc
  constructor(operatorStr, calcFunction) {
    this.value = operatorStr
    this.calc = calcFunction
  }

  toString() {
    return `Operator [${this.value}]`
  }
}

export const ADD = new Operator('+', (l, r) => l + r)
export const MINUS = new Operator('−', (l, r) => l - r)
export const values = [ADD, MINUS]