import * as Random from 'calgen/util/Random.js'
import SimpleFormula from 'calgen/model/SimpleFormula'
import * as Operator from 'calgen/model/Operator'
import AnswerBasedGen from './AnswerBasedGen'
import DigitsBasedGen from './DigitsBasedGen'

export default class CompositeGen {

  answerBasedGen = new AnswerBasedGen()
  digitsBasedGen = new DigitsBasedGen()

  generateAdd = (answerMin, answerMax, leftMin) => {
    return this.answerBasedGen.generateAdd(answerMin, answerMax, leftMin)
  }

  generateMinus = (answerMin, answerMax, leftMax) => {
    return this.answerBasedGen.generateMinus(answerMin, answerMax, leftMax);
  }

  generateMultiplyWithDigits = (leftDigit, rightDigit) => {
    let left = Random.integer(Math.pow(10, leftDigit), Math.pow(10, leftDigit + 1))
    let right = Random.integer(Math.pow(10, rightDigit), Math.pow(10, rightDigit + 1))
    return new SimpleFormula(left, Operator.MULTIPLY, right, left * right)
  }

}
