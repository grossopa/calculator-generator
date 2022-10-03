import * as Random from 'calgen/util/Random.js';
import SimpleFormula from 'calgen/model/SimpleFormula'
import * as Operator from 'calgen/model/Operator'

export default class DigitsBasedGen {

  generateAdd = (leftDigit, rightDigit, exact) => {
    let left = this.randomInteger(leftDigit, exact)
    let right = this.randomInteger(rightDigit, exact)
    return new SimpleFormula(left, Operator.ADD, right, left + right, 0)
  }

  generateMinus = (leftDigit, rightDigit, exact) => {
    let left = this.randomInteger(leftDigit, exact)
    let right = this.randomInteger(rightDigit, exact)
    return new SimpleFormula(left, Operator.MINUS, right, left - right, 0)
  }

  generateMultiply = (leftDigit, rightDigit) => {
    let left = Random.integer(Math.pow(10, leftDigit), Math.pow(10, leftDigit + 1))
    let right = Random.integer(Math.pow(10, rightDigit), Math.pow(10, rightDigit + 1))
    return new SimpleFormula(left, Operator.MULTIPLY, right, left * right)
  }

  generateDivide = (leftDigit, rightDigit) => {
    let left = Random.integer(Math.pow(10, leftDigit), Math.pow(10, leftDigit + 1))
    let right = Random.integer(Math.pow(10, rightDigit), Math.pow(10, rightDigit + 1))
    return new SimpleFormula(left, Operator.DIVIDE, right, Math.floor(left / right), left % right)
  }

  /**
   * Generates random integer based on the maxinum digits and exact digit or ranged (from 0)
   * 
   * @param {integer} maxDigit the maximum digits of the generated number
   * @param {boolean} exact the digit must be exact or could be [1, maxDigit]
   * @returns the generated number
   */
  randomInteger(maxDigit, exact) {
    let l = exact ? Math.pow(10, maxDigit) : 0
    let r = Math.pow(10, maxDigit + 1)
    return Random.integer(l, r)
  }
}