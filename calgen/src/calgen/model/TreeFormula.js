import * as Random from 'calgen/util/Random'

export default class TreeFormula {
  leftNode
  rightNode
  formula

  getNumberCount() {
    let count = 0
    if (this.leftNode) {
      count = this.leftNode.getNumberCount()
    } else {
      count = 1
    }
    if (this.rightNode) {
      count += this.rightNode.getNumberCount()
    } else {
      count += 1
    }
    return count
  }

  toDisplayString(fillBlank) {
    let numberCount = this.getNumberCount()

    let randomBlank = -1
    if (fillBlank === 3) { // both
      randomBlank = Random.integer(1, numberCount + 1)
    } else if (fillBlank === 2) { // left
      randomBlank = Random.integer(1, numberCount)
    } else { // right
      randomBlank = numberCount
    }
    console.log(numberCount, randomBlank)
    return this.iterToDisplayString([randomBlank], true)
  }

  iterToDisplayString(blankIndexRef, withAnswer) {
    let left = ''
    let right = ''
    let blankStr = '___'

    if (this.leftNode && this.leftNode.formula) {
      left = this.leftNode.iterToDisplayString(blankIndexRef, false)
    } else {
      blankIndexRef[0]--
      if (blankIndexRef[0] === 0) {
        left = blankStr
      } else {
        left = this.formula.left
      }
    }

    if (this.rightNode && this.rightNode.formula) {
      right = `(${this.rightNode.iterToDisplayString(blankIndexRef, false)})`
    } else {
      blankIndexRef[0]--
      if (blankIndexRef[0] === 0) {
        right = blankStr
      } else {
        right = this.formula.right
      }
    }

    let answerStr = ''
    if (withAnswer) {
      if (blankIndexRef[0] <= 0) {
        answerStr = ` = ${this.formula.answer}`
      } else {
        answerStr = ` = ${blankStr}`
      }
    }

    return `${left} ${this.formula.operator.value} ${right}${answerStr}`
  }

}
