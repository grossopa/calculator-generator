export default class SimpleFormula {
  left
  right
  operator
  answer

  constructor(left, operator, right, answer) {
    this.left = left
    this.operator = operator
    this.right = right
    this.answer = answer
  }

  toDisplayString() {
    return this.toDisplayStringNoAnswer() + ` = ${this.answer}`
  }

  toDisplayStringNoAnswer() {
    return `${this.left} ${this.operator.value} ${this.right}`
  }

}