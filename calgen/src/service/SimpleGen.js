import * as Random from 'util/Random.js'
import SimpleFormula from 'model/SimpleFormula'
import * as Operator from 'model/Operator'

export default class SimpleGen {

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
    
}
