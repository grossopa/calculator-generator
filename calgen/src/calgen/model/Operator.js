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

export const ADD = new Operator('+', (l, r) => l + r, 0x001)
export const MINUS = new Operator('−', (l, r) => l - r, 0x010)
export const MULTIPLY = new Operator('*', (l, r) => l * r, 0x100)
export const values = [ADD, MINUS]

/**
 * Finds the operators from the combined questionType
 * 
 * @param questionType int value between 0x0001 to 0x1000
 * @returns the operator array
 */
export const fromQuestionType = questionType => {
  return [ADD, MINUS, MULTIPLY].filter(o => (o.questionType & questionType) !== 0)
}