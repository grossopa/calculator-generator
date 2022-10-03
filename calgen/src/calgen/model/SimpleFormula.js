import * as Operator from 'calgen/model/Operator'

export default class SimpleFormula {
  left
  right
  operator
  answer
  answerExtra

  constructor(left, operator, right, answer, answerExtra = 0) {
    this.left = left
    this.operator = operator
    this.right = right
    this.answer = answer
    this.answerExtra = answerExtra
  }

  multiply(number) {
    this.left = this.left * number;
    this.answer = this.answer * number;
    if (this.operator === Operator.ADD || this.operator === Operator.MINUS) {
      this.right = this.right * number;
    }
  }

  calculate() {
    return this.operator.calc(this.left, this.right)
  }

  toDisplayString() {
    return this.toDisplayStringNoAnswer() + ` = ${this.answer}`
  }

  toDisplayStringNoAnswer() {
    return `${this.left} ${this.operator.value} ${this.right}`
  }

}