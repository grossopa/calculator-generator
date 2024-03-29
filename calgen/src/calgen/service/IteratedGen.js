import CompositeFormula from 'calgen/model/CompositeFormula';
import * as Operator from 'calgen/model/Operator';
import * as Random from 'calgen/util/Random.js';
import CompositeGen from './generator/CompositeGen';

export default class IteratedGen {

  generator = new CompositeGen();

  generate = (min, max, round, operators = Operator.values) => {
    let answer = Random.integer(min, max)
    let remain = answer
    let result = new CompositeFormula(answer)
    for (let i = 0; i < round; i++) {
      let selectedOperator = Random.select(operators)
      var formula
      if (selectedOperator === Operator.ADD) {
        formula = this.generator.generateAdd(remain, remain, min)
      } else if (selectedOperator === Operator.MINUS) {
        formula = this.generator.generateMinus(remain, remain, max)
      } else if (selectedOperator === Operator.MULTIPLY) {
        // for multiply we don't care the remaining answer
        formula = this.generator.generateMultiplyWithDigits(min, max)
      } else if (selectedOperator === Operator.DIVIDE) {
        formula = this.generator.generateDivide(remain, remain, min)
      }

      result.unshift(formula)
      remain = formula.left
    }

    return result
  }



}
