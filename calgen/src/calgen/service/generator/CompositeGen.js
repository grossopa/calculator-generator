import * as Random from 'calgen/util/Random.js'
import SimpleFormula from 'calgen/model/SimpleFormula'
import * as Operator from 'calgen/model/Operator'
import AnswerBasedGen from './AnswerBasedGen'
import DigitsBasedGen from './DigitsBasedGen'

export default class SimpleGen {

  answerBasedGen = new AnswerBasedGen()
  digitsBasedGen = new DigitsBasedGen()

  generateAdd = (answerMin, answerMax, leftMin) => {
    let answer = Random.integer(answerMin, answerMax)
    let left = Random.integer(leftMin, answer)
    return new SimpleFormula(left, Operator.ADD, answer - left, answer)
  }

  generateMinus = (answerMin, answerMax, leftMax) => {
    let answer = Random.integer(answerMin, answerMax)
    let left = Random.integer(answer, leftMax)
    return new SimpleFormula(left, Operator.MINUS, left - answer, answer)
  }

  generateMultiplyWithDigits = (leftDigit, rightDigit) => {
    let left = Random.integer(Math.pow(10, leftDigit), Math.pow(10, leftDigit + 1))
    let right = Random.integer(Math.pow(10, rightDigit), Math.pow(10, rightDigit + 1))
    return new SimpleFormula(left, Operator.MULTIPLY, right, left * right)
  }

  generateDivide = (answerMin, answerMax, leftMax) => {
    return this.answerBasedGen.generateDivide(answerMin, answerMax, leftMax)
  }

}
