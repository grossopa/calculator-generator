import CompositeFormula from 'calgen/model/CompositeFormula';
import * as Operator from 'calgen/model/Operator';
import * as Random from 'calgen/util/Random.js';
import SimpleGen from './generator/CompositeGen';
import SimpleFormula from 'calgen/model/SimpleFormula'

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
        let left;
        let right = this.randomDivider(numberDigits[i]);
        if (result.isEmpty()) {
          // TODO: good way to random the answer?
          answer = Random.integer(1, 100)
          left = answer * right
        } else {
          for (let j = 0; j < i; j++) {
            result.getByIndex(j).multiply(right);
          }
          left = result.getByIndex(i - 1).answer
          answer = left / right
        }
        formula = new SimpleFormula(left, selectedOperator, right, selectedOperator.calc(left, right))
      }
      
      result.answer = answer
      result.push(formula)
    }

    return result
  }

  randomDivider(digits) {
    var divider = 0;
    if (digits === 1) {
      return Random.gracefulDivider(1, 10)
    } else if (digits === 2) {
      return Random.gracefulDivider(1, 100, true)
    } else {
      return Random.integer(Math.pow(10, digits - 1), Math.pow(10, digits))
    }
  }

}
