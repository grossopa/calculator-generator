import * as Random from 'calgen/util/Random.js'
import SimpleFormula from 'calgen/model/SimpleFormula'
import * as Operator from 'calgen/model/Operator'

export default class AnswerBasedGen {

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

  generateMultiply = (leftDigit, rightDigit) => {
    let left = Random.integer(Math.pow(10, leftDigit), Math.pow(10, leftDigit + 1))
    let right = Random.integer(Math.pow(10, rightDigit), Math.pow(10, rightDigit + 1))
    return new SimpleFormula(left, Operator.MULTIPLY, right, left * right)
  }

  generateDivide = (answerMin, answerMax, leftMax) => {
    var answer = Random.integer(answerMin, answerMax)
    let dividerMax = Math.floor(leftMax / answerMin)
    let divider = Random.gracefulDivider(1, dividerMax)
    return new SimpleFormula(divider * answer, Operator.DIVIDE, divider, answer)
  }
}
