import * as Operator from 'calgen/model/Operator'
import * as BlankPosition from 'calgen/model/BlankPosition'

export default class DivideWithExtraFormula {
  left
  right
  answer
  answerExtra

  constructor(left, right, answer, answerExtra = 0) {
    this.left = left
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

  toDisplayString(fillBlank) {
    let blank = '___'
    let randomBlank = BlankPosition.valueOf(fillBlank).randomPosition(2)

    if (randomBlank === 0) {
      this.left = blank
    } else if (randomBlank === 1) {
      this.right = blank
    } else {
      this.answer = blank
      this.answerExtra = blank
    }

    return `${this.left}${Operator.DIVIDE.value}${this.right}=${this.answer} 余 ${this.answerExtra}`
  }

}