import TreeFormula from 'calgen/model/TreeFormula';
import * as Operator from 'calgen/model/Operator';
import * as Random from 'calgen/util/Random.js';
import CompositeGen from './generator/CompositeGen';
import AnswerBasedGen from './generator/AnswerBasedGen';

export default class DigitsBasedTreeGen {

  answerGen = new AnswerBasedGen();
  generator = new CompositeGen()

  generate = (numberDigits, round, operators = Operator.values) => {
    let maxDigits = numberDigits.reduce((acc, n) => Math.max(acc, n), 0);
    let remain = Random.gracefulDivider(1, Math.pow(10, maxDigits + 1));
    let leafNodes = []

    let rootNode = new TreeFormula()
    leafNodes.push({ node: rootNode, child: 0 }, { node: rootNode, child: 1 })

    let currentNode = rootNode
    for (let i = 0; i < round; i++) {
      let selectedOperator = Random.select(operators)
      console.log("Remain", remain)
      
      var formula
      if (selectedOperator === Operator.MULTIPLY) {
        formula = this.answerGen.generateMultiply(remain, remain);
      } else if (selectedOperator === Operator.DIVIDE) {
        formula = this.answerGen.generateDivide(remain, remain, Math.pow(10, numberDigits[i] + 2))
      }

      currentNode.formula = formula
      let selectResult = Random.selectAndRemove(leafNodes)
      let chosenNode = selectResult.selected
      leafNodes = selectResult.rest

      let newNode = new TreeFormula()

      if (chosenNode.child === 0) {
        chosenNode.node.leftNode = newNode
        remain = chosenNode.node.formula.left
      } else {
        chosenNode.node.rightNode = newNode
        remain = chosenNode.node.formula.right
      }

      currentNode = newNode
      leafNodes.push({ node: newNode, child: 0 }, { node: newNode, child: 1 })
    }

    return rootNode
  }
}