export default class TreeFormula {
  leftNode
  rightNode
  formula

  toDisplayString(withAnswer) {
    let left = ''
    let right = ''
    if (this.leftNode && this.leftNode.formula) {
      left = this.leftNode.toDisplayString(false)
    } else {
      left = this.formula.left
    }

    if (this.rightNode && this.rightNode.formula) {
      right = `(${this.rightNode.toDisplayString(false)})`
    } else {
      right = this.formula.right
    }

    return `${left} ${this.formula.operator.value} ${right}` + (withAnswer ? ` = ${this.formula.answer}` : '')
  }
}
