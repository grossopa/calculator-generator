import * as Random from 'calgen/util/Random.js'
import * as MathUtils from 'calgen/util/MathUtils'
import SimpleFormula from 'calgen/model/SimpleFormula'
import * as Operator from 'calgen/model/Operator'

export default class AnswerBasedGen {

  generateAdd = (answerMin, answerMax, leftMin) => {
    let answer = Random.integer(answerMin, answerMax)
    let left = Random.integer(Math.min(leftMin, answerMin), answer)
    return new SimpleFormula(left, Operator.ADD, answer - left, answer)
  }

  generateMinus = (answerMin, answerMax, leftMax) => {
    let answer = Random.integer(answerMin, answerMax)
    let left = Random.integer(answer, Math.max(leftMax, answerMax))
    
    return new SimpleFormula(left, Operator.MINUS, left - answer, answer)
  }

  generateMultiply = (answerMin, answerMax) => {
    let answer = Random.integer(answerMin, answerMax)
    let factors = MathUtils.factorize(answer);
    let right = Random.selectSubArray(factors).reduce((acc, v) => acc * v, 1);
    let left = Math.floor(answer / right);

    console.log(answerMin, answerMax, factors, right, left)

    return new SimpleFormula(left, Operator.MULTIPLY, right, answer)
  }

  generateDivide = (answerMin, answerMax, leftMax) => {
    var answer = Random.integer(answerMin, answerMax)
    let dividerMax = Math.floor(leftMax / answerMin)
    let divider = Random.gracefulDivider(1, dividerMax)
    console.log(leftMax, answer, dividerMax, divider)
    return new SimpleFormula(divider * answer, Operator.DIVIDE, divider, answer)
  }
}
