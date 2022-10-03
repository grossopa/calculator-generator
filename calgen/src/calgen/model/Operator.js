class Operator {
  value
  calc
  questionType
  constructor(operatorStr, calcFunction, questionType) {
    this.value = operatorStr
    this.calc = calcFunction
    this.questionType = questionType
  }

  toString() {
    return `Operator [${this.value}]`
  }
}

export const ADD_VAL       = 0x0001
export const MINUS_VAL     = 0x0010
export const MULTIPLY_VAL  = 0x0100
export const DIVIDE_VAL    = 0x1000

export const ADD       = new Operator('+', (l, r) => l + r, ADD_VAL)
export const MINUS     = new Operator('-', (l, r) => l - r, MINUS_VAL)
export const MULTIPLY  = new Operator('×', (l, r) => l * r, MULTIPLY_VAL)
export const DIVIDE    = new Operator('÷', (l, r) => l / r, DIVIDE_VAL)
export const values    = [ADD, MINUS, MULTIPLY, DIVIDE]

/**
 * Finds the operators from the combined questionType
 * 
 * @param questionType int value between 0x0001 to 0x1000
 * @returns the operator array
 */
export const fromQuestionType = questionType => {
  return values.filter(o => (o.questionType & questionType) !== 0)
}