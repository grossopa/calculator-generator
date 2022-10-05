import CompositeFormula from 'calgen/model/CompositeFormula';
import * as Operator from 'calgen/model/Operator';
import * as Random from 'calgen/util/Random.js';
import SimpleGen from './generator/CompositeGen';
import SimpleFormula from 'calgen/model/SimpleFormula'
import DivideWithExtraFormula from 'calgen/model/DivideWithExtraFormula'

export default class DigitsBasedIteratedGen {

  generator = new SimpleGen();

  generate = (numberDigits, round, operators = Operator.values) => {
    let answer;
    let result = new CompositeFormula()

    for (let i = 0; i < round; i++) {
      let selectedOperator = Random.select(operators)
      var formula
      /* if (selectedOperator === Operator.ADD) {
        formula = this.generator.generateAdd(remain, remain, min)
      } else if (selectedOperator === Operator.MINUS) {
        formula = this.generator.generateMinus(remain, remain, max)
      } else */
      if (selectedOperator === Operator.MULTIPLY) {
        let left = i === 0 ? Random.integer(Math.pow(10, numberDigits[i] - 1), Math.pow(10, numberDigits[i])) : answer
        let right = Random.integer(Math.pow(10, numberDigits[i + 1] - 1), Math.pow(10, numberDigits[i + 1]))
        formula = new SimpleFormula(left, selectedOperator, right, selectedOperator.calc(left, right))
        answer = selectedOperator.calc(left, right)
      } else if (selectedOperator === Operator.DIVIDE) {
        formula = this.generateDivide(numberDigits[i], result, selectedOperator)
        answer = formula.calculate()
      }
      
      result.answer = answer
      result.push(formula)
    }

    return result
  }

  generateDividerWithExtra = (numberDigit) => {
    let simpleFormula = this.generateDivide(numberDigit, null, Operator.DIVIDE_WITH_EXTRA)
    let answerExtra = Random.integer(0, simpleFormula.right)
    return new DivideWithExtraFormula(simpleFormula.left + answerExtra, simpleFormula.right, simpleFormula.answer, answerExtra)
  }

  generateDivide = (numberDigit, result, operator) => {
    let left
    let right = this.randomDivider(numberDigit)
    let answer
    if (!result || result.isEmpty()) {
      // TODO: good way to random the answer?
      answer = Random.integer(1, 100)
      left = answer * right
    } else {
      for (let j = 0; j < result.length; j++) {
        result.getByIndex(j).multiply(right);
      }
      left = result.getByIndex(result.length - 1).answer
      answer = left / right
    }
    return new SimpleFormula(left, operator, right, operator.calc(left, right))
  }

  randomDivider(digits) {
    if (digits === 1) {
      return Random.gracefulDivider(1, 10)
    } else if (digits === 2) {
      return Random.gracefulDivider(1, 100, true)
    } else {
      return Random.integer(Math.pow(10, digits - 1), Math.pow(10, digits))
    }
  }

}
