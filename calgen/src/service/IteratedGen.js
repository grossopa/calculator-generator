import CompositeFormula from 'model/CompositeFormula';
import * as Operator from 'model/Operator';
import * as Random from 'util/Random.js';
import SimpleGen from './SimpleGen';

export default class IteratedGen {

  generator = new SimpleGen();

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
      }

      result.unshift(formula)
      remain = formula.left
    }

    return result
  }

}
