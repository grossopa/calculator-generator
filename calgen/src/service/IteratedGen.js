import * as Random from 'util/Random.js'
import SimpleFormula from 'model/SimpleFormula'
import * as Operator from 'model/Operator'
import SimpleGen from './SimpleGen'
import CompositeFormula from 'model/CompositeFormula';

export default class IteratedGen {

    generator = new SimpleGen();

    generate = (min, max, round) => {
        let answer = Random.integer(min, max)
        let remain = answer
        let result = new CompositeFormula(answer) 
        for (let i = 0; i < round; i++) {
            let formula = this.generator.generateAdd(remain, remain, min)
            result.unshift(formula)
            remain = formula.left
        } 

        return result
    }
    
}
