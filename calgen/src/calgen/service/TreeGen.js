import TreeFormula from 'calgen/model/TreeFormula';
import * as Operator from 'calgen/model/Operator';
import * as Random from 'calgen/util/Random.js';
import CompositeGen from './generator/CompositeGen';

export default class TreeGen {

  generator = new CompositeGen()

  generate = (min, max, round, operators = Operator.values) => {
    let answer = Random.integer(min, max)
    let remain = answer

    let leafNodes = []

    let rootNode = new TreeFormula()
    leafNodes.push({ node: rootNode, child: 0 }, { node: rootNode, child: 1 })

    let currentNode = rootNode
    for (let i = 0; i < round; i++) {
      let selectedOperator = Random.select(operators)
      
      var formula
      if (selectedOperator === Operator.ADD) {
        formula = this.generator.generateAdd(remain, remain, min)
      } else if (selectedOperator === Operator.MINUS) {
        formula = this.generator.generateMinus(remain, remain, max)
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